import { fees } from "@better-giving/constants";
import { Txs } from "@better-giving/db";
import type { ITributeNotif } from "@better-giving/donation";
import { partition } from "@better-giving/helpers";
import { default_allocation } from "constants/common";
import { resp } from "helpers/https";
import { nanoid } from "nanoid";
import type { ActionFunction } from "react-router";
import type { FinalRecorderPayload } from "../types/final-recorder";
import { referral_commission_rate } from "./config";
import {
  type IReferrerLtdItem,
  commission_fn,
  ltd_by_referrer,
  referrer_ltd_update_txi,
} from "./helpers";
import { type Base, type Overrides, settle_txs } from "./settle-txs";
import { apply_fees, fund_contrib_update } from "./settle-txs/helpers";
import {
  TransactWriteCommand,
  ap,
  apes,
  donordb,
  npodb,
  onholddb,
} from ".server/aws/db";
import { env } from ".server/env";
import { fiat_monitor } from ".server/sdks";
import { is_resp, qstash_body } from ".server/utils";

export const action: ActionFunction = async ({ request }) => {
  try {
    const b = await qstash_body(request);
    if (is_resp(b)) return b;
    const tx = JSON.parse(b) as FinalRecorderPayload;

    /** Donation to endowment and BG tip is bundled into single payment intent */
    const parts = partition(
      tx.amount.total,
      tx.amount.tip,
      tx.amount.fee_allowance
    );
    const p_net_settled = parts(tx.amount.settled_net);
    const p_processing_fee = parts(tx.amount.settled_fee);

    /** ** DONATION RECORDS **  */
    const p_init_amount = parts(tx.amount.total);
    const p_init_amount_usd = parts(tx.amount.usd_value);
    const p_fee_allowance = parts(p_init_amount_usd.feeAllowance);

    const base: Base = {
      transactionDate: tx.date,
      network: env,
      isRecurring: tx.is_recurring,
      denomination: tx.amount.currency,

      //to
      ...(tx.program && {
        programId: tx.program.id,
        programName: tx.program.name,
      }),

      //via
      appUsed: tx.app_used,
      chainId: tx.via.id,
      chainName: tx.via.name,
      fiatRamp: tx.via.name as any,
      paymentMethod: tx.via.method,

      // from
      fullName: tx.from.name,
      email: tx.from.id,
      title: tx.from.title,
      streetAddress: tx.from.address?.street,
      state: tx.from.address?.state,
      city: tx.from.address?.city,
      country: tx.from.address?.country,
      zipCode: tx.from.address?.zip,
      company_name: tx.from.company_name,
      donor_message: tx.from.message,
      donor_public: tx.from.is_public,

      // settlement
      destinationChainId: tx.settled_in.id,
      donationFinalChainId: tx.settled_in.id,
      donationFinalDenom: tx.settled_in.currency,
      donationFinalTxDate: new Date().toISOString(),
      donationFinalTxHash: tx.settled_in.hash,
    };

    if (tx.tribute) {
      base.inHonorOf = tx.tribute.to;
      if (tx.tribute.notif) {
        const notif: ITributeNotif = {
          toEmail: tx.tribute.notif.to_email,
          toFullName: tx.tribute.notif.to_fullname,
          fromMsg: tx.tribute.notif.from_msg ?? "",
        };
        base.tributeNotif = notif;
      }
    }

    const txs = new Txs();

    const processed_tip = apply_fees(
      p_net_settled.tip,
      tx.to.no_tip ? fees.base : 0,
      0,
      p_processing_fee.tip,
      p_fee_allowance.tip
    );

    const net_tip = p_net_settled.tip - p_processing_fee.tip;
    const tip_commission = net_tip * referral_commission_rate;
    const tip_tos: string[] = [];

    /** donation to a fund */
    const num_members = tx.to.members.length;
    if (num_members > 0) {
      let fund_net = 0;
      const commission_ltds: IReferrerLtdItem[] = [];
      for (const member of tx.to.members) {
        const endow = await npodb.npo(+member);
        if (!endow) {
          console.error(`Endowment ${member} not found!`);
          continue;
        }

        const processed = apply_fees(
          p_net_settled.endow / num_members,
          endow.hide_bg_tip ? fees.base : 0,
          endow.fiscal_sponsored ? fees.fiscal_sponsor : 0,
          p_processing_fee.endow / num_members,
          p_fee_allowance.endow / num_members
        );

        const endow_commission_fee =
          processed.fees.base * referral_commission_rate;

        const overrides: Overrides = {
          endowId: endow.id,
          input: p_init_amount.endow / num_members,
          inputUsd: p_init_amount_usd.endow / num_members,
          settled: p_net_settled.endow / num_members,
          net: processed.net,
          feeAllowance: p_fee_allowance.endow / num_members,
          excessFeeAllowance: processed.excess * (1 - referral_commission_rate),
          fees: processed.fees,
          txId: nanoid(),
          fundTx: tx.id,
          fundId: tx.to.id,
          fundName: tx.to.name,
          endowName: endow.name,
          claimed: endow.claimed,
          fiscal_sponsored: endow.fiscal_sponsored,
          msg_to_npo: num_members === 1 ? tx.from.message : undefined,
          allocation: endow.allocation || default_allocation,
        };

        // for fund members without referrer, commission remains with BG
        // BG is treated as the referrer for the NPO (organic)
        const c = commission_fn(
          {
            tip: tip_commission / num_members,
            fee: endow_commission_fee / num_members,
            id: tx.id,
          },
          endow
        );
        if (c) {
          overrides.referrer = { id: c.ltd.id, commission: c.breakdown };
          txs.put(c.record);
          tip_tos.push(c.ltd.id);
          commission_ltds.push(c.ltd);
        }

        const _txs = await settle_txs(base, overrides);
        txs.append(_txs);
        //use net as it reflects fee allowance add-back
        fund_net += processed.net;

        // creates single donation message record per fund member
        if (tx.from.is_public) {
          const r = donordb.record({
            id: nanoid(),
            donation_id: tx.id,
            date: tx.id,
            donor_id: tx.from.id,
            donor_message: tx.from.message ?? "",
            donor_name: tx.from.name,
            env: endow.env,
            recipient_id: `${endow.id}`,
            amount: tx.amount.usd_value / num_members,
          });
          txs.put(donordb.put_txi(r));
        }
      }
      //commit ltds per referrer

      for (const [r, i] of Object.entries(ltd_by_referrer(commission_ltds))) {
        txs.update(referrer_ltd_update_txi(r, i));
      }

      await ap
        .send(fund_contrib_update(fund_net, tx.to.id))
        .catch(console.error);
      // to single endowment
    } else {
      const endow = await npodb.npo(+tx.to.id);
      if (!endow) {
        console.error(`Endowment ${tx.to.id} not found!`);
        return;
      }
      const processed = apply_fees(
        p_net_settled.endow,
        tx.to.no_tip ? fees.base : 0,
        endow.fiscal_sponsored ? fees.fiscal_sponsor : 0,
        p_processing_fee.endow,
        p_fee_allowance.endow
      );

      const endow_commission_fee =
        (processed.excess + processed.fees.base + processed.fees.fsa) *
        referral_commission_rate;

      const overrides: Overrides = {
        endowId: endow.id,
        input: p_init_amount.endow,
        inputUsd: p_init_amount_usd.endow,
        settled: p_net_settled.endow,
        net: processed.net,
        feeAllowance: p_fee_allowance.endow,
        excessFeeAllowance: processed.excess * (1 - referral_commission_rate),
        fees: processed.fees,
        txId: tx.id,
        endowName: endow.name,
        claimed: endow.claimed,
        fiscal_sponsored: endow.fiscal_sponsored,
        msg_to_npo: tx.from.message,
        allocation: endow.allocation || default_allocation,
      };
      const c = commission_fn(
        {
          tip: tip_commission,
          fee: endow_commission_fee,
          id: tx.id,
        },
        endow
      );
      if (c) {
        overrides.referrer = { id: c.ltd.id, commission: c.breakdown };
        txs.put(c.record);
        tip_tos.push(c.ltd.id);
        txs.update(referrer_ltd_update_txi(c.ltd.id, [c.ltd.source]));
      }
      const _txs = await settle_txs(base, overrides);
      txs.append(_txs);
    }

    txs.del(onholddb.del_txi(tx.id));

    /** creates donation message for single fund/npo donation */
    if (tx.from.is_public) {
      const r = donordb.record({
        id: nanoid(),
        date: tx.date,
        donor_id: tx.from.id,
        donor_message: tx.from.message ?? "",
        donor_name: tx.from.name,
        env: env,
        recipient_id: tx.to.id,
        donation_id: tx.id,
        amount: tx.amount.usd_value,
      });
      txs.put(donordb.put_txi(r));
    }

    const BG_ENDOW_ID = 1293762;
    const overrides: Overrides = {
      endowId: BG_ENDOW_ID,
      input: p_init_amount.tip,
      inputUsd: p_init_amount_usd.tip,
      settled: p_net_settled.tip,
      net: net_tip,
      feeAllowance: p_fee_allowance.tip,
      excessFeeAllowance: processed_tip.excess,
      fees: processed_tip.fees,
      txId: nanoid(),
      parentTx: tx.id,
      endowName: "Better Giving",
      claimed: true,
      fiscal_sponsored: false,
      allocation: default_allocation,
    };

    //deduct paid commissions
    if (tip_tos.length > 0) {
      overrides.referrer = {
        // donation record not used in referrer dashboard
        id: `internal:${tip_tos.join(",")}`,
        commission: {
          from_tip: tip_commission,
          from_fee: 0,
        },
      };
      overrides.net -= tip_commission;
    }
    const tipTxs = await settle_txs(base, overrides);
    txs.append(tipTxs);

    const res = await apes.send(
      new TransactWriteCommand({ TransactItems: txs.all })
    );
    return resp.json(res.$metadata);
  } catch (err) {
    console.error(err);
    await fiat_monitor.sendAlert({
      type: "ERROR",
      from: `final-donation-recorder:${env}`,
      title: "Lambda encountered an error",
      fields: [
        {
          name: "Message",
          value: "Please check FinalDonationRecorderDLQ",
        },
        {
          name: "Error log",
          value: JSON.stringify(err, Object.getOwnPropertyNames(err)),
        },
      ],
    });
    return resp.err(500, "something went wrong :((");
  }
};
