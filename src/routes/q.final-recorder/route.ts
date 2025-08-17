import { fees } from "@better-giving/constants";
import type { Donation, OnHoldDonation } from "@better-giving/donation";
import { partition } from "@better-giving/helpers";
import { TxBuilder } from "@better-giving/helpers-db";
import { tables } from "@better-giving/types/list";
import type { ActionFunction } from "@vercel/remix";
import { default_allocation } from "constants/common";
import { resp } from "helpers/https";
import { nanoid } from "nanoid";
import type { FinalRecorderPayload } from "../types/final-recorder";
import { referral_commission_rate } from "./config";
import { build_donation_msg, commission_fn } from "./helpers";
import { type Base, type Overrides, settle_txs } from "./settle-txs";
import { apply_fees, fund_contrib_update } from "./settle-txs/helpers";
import { TransactWriteCommand, ap, apes, npodb } from ".server/aws/db";
import { env } from ".server/env";
import { discordFiatMonitor, qstash_receiver } from ".server/sdks";

export const action: ActionFunction = async ({ request }) => {
  try {
    const sig = request.headers.get("upstash-signature");
    if (!sig) return resp.err(400, "no signature");

    const body = await request.text();

    const url = new URL(request.url).toString();
    await qstash_receiver.verify({
      signature: sig,
      body,
      url,
    });
    const tx = JSON.parse(body) as FinalRecorderPayload;

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
      //KEYS
      appUsed: tx.app_used as any,
      email: tx.from.id,
      transactionDate: tx.date,
      //ATTRIBUTES
      chainId: tx.via.id as any,
      chainName: tx.via.name,
      fiatRamp: tx.via.name as any,
      client: "apes",
      denomination: tx.amount.currency,
      isRecurring: tx.is_recurring,
      network: env,
      paymentMethod: tx.via.method,
      /**  */
      splitLiq: "100",
      //FINAL DONATION DATA
      destinationChainId: tx.settled_in.id,
      donationFinalChainId: tx.settled_in.id,
      donationFinalDenom: tx.settled_in.currency,
      donationFinalTxDate: new Date().toISOString(),
      donationFinalTxHash: tx.settled_in.hash,
      kycEmail: tx.from.id,
      fullName: tx.from.name,
      company_name: tx.from.company_name,
      ukGiftAid: tx.from.uk_gift_aid,
      ...(tx.from.title && { title: tx.from.title as any }),
      ...(tx.from.address && {
        streetAddress: tx.from.address.street,
        city: tx.from.address.city,
        state: tx.from.address.state,
        zipCode: tx.from.address.zip,
        country: tx.from.address.country,
      }),
    };

    if (tx.tribute) {
      base.inHonorOf = tx.tribute.to;
      if (tx.tribute.notif) {
        const notif: Donation.TributeNotif = {
          toEmail: tx.tribute.notif.to_email,
          toFullName: tx.tribute.notif.to_fullname,
          fromMsg: tx.tribute.notif.from_msg ?? "",
        };
        base.tributeNotif = notif;
      }
    }
    if (tx.program) {
      base.programId = tx.program.id;
      base.programName = tx.program.name;
    }

    const builder = new TxBuilder();

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
          overrides.referrer = { id: c.to, commission: c.breakdown };
          builder.append(c.txs);
          tip_tos.push(c.to);
        }

        const _txs = await settle_txs(base, overrides);
        builder.append(_txs);
        //use net as it reflects fee allowance add-back
        fund_net += processed.net;

        // creates single donation message record per fund member
        if (tx.from.is_public) {
          const msg = build_donation_msg({
            date: tx.id,
            donor_id: tx.from.id,
            donor_message: tx.from.message ?? "",
            donor_name: tx.from.name,
            env: endow.env,
            recipient_id: `${endow.id}`,
            transaction_id: tx.id,
            usd_value: tx.amount.usd_value / num_members,
          });
          builder.put({ TableName: tables.donation_messages, Item: msg });
        }
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
        overrides.referrer = { id: c.to, commission: c.breakdown };
        builder.append(c.txs);
        tip_tos.push(c.to);
      }
      const _txs = await settle_txs(base, overrides);
      builder.append(_txs);
    }

    builder.del({
      TableName: tables.on_hold_donations,
      Key: { transactionId: tx.id } as OnHoldDonation.PrimaryKey,
    });

    /** creates donation message for single fund/npo donation */
    if (tx.from.is_public) {
      const msg = build_donation_msg({
        date: tx.date,
        donor_id: tx.from.id,
        donor_message: tx.from.message ?? "",
        donor_name: tx.from.name,
        env: env,
        recipient_id: tx.to.id,
        transaction_id: tx.id,
        usd_value: tx.amount.usd_value,
      });
      builder.put({ TableName: tables.donation_messages, Item: msg });
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
    builder.append(tipTxs);

    const res = await apes.send(
      new TransactWriteCommand({ TransactItems: builder.txs })
    );
    return resp.json(res.$metadata);
  } catch (err) {
    console.error(err);
    await discordFiatMonitor.sendAlert({
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
