import crypto from "node:crypto";
import tokens from "@better-giving/assets/tokens/map";
import { fees } from "@better-giving/constants";
import type { Donation, OnHoldDonation } from "@better-giving/donation";
import { partition } from "@better-giving/helpers";
import { TxBuilder } from "@better-giving/helpers-db";
import {
  applyFees,
  fundContribUpdate,
} from "@better-giving/helpers-donation-settlement";
import {
  type Base,
  type Overrides,
  settleTxs,
} from "@better-giving/helpers-donation-settlement/txs";
import type { NP } from "@better-giving/nowpayments/types";
import { tables } from "@better-giving/types/list";
import { buildDonationMsg } from "routes/helpers/db";
import { getEndow, getOrder } from "../../helpers";
import { commissionFn, referral_commission_rate } from "./helpers";
import { TransactWriteCommand, ap, apes } from ".server/aws/db";
import { np } from ".server/sdks";

/**
 * fees, outcomes, are all denominated in the same currency
 * settlement currency is USDC ( set in account), regardless of chain
 * fiat equivalents (actual_paid_amount_fiat) in "usd" set in account
 *
 */
export const handleSettled = async (payment: NP.PaymentPayload) => {
  const order = await getOrder(payment.order_id);

  if (!order) throw `Record ${payment.order_id} not found!`;

  /* ** EXTRACT TIP, FEE ALLOWANCE ** */
  const parts = partition(order.amount, order.tipAmount, order.feeAllowance);

  const { rate: outcomeRate } = await np.estimate(payment.outcome_currency);

  /** all in usd */
  const settlement = {
    net: payment.outcome_amount * outcomeRate,
    fee:
      payment.fee.depositFee +
      payment.fee.serviceFee +
      payment.fee.withdrawalFee,
  };

  const settledUsd = parts(settlement.net);
  const processingFee = parts(settlement.fee);

  const finalizedTxISODate = new Date().toISOString();

  //extract tip and feeAllowance from full amount ( already proportioned from "confirmed" handler )
  const paidAmount = parts(order.amount);
  const paidAmountUsd = parts(payment.actually_paid);
  const feeAllowance = parts(paidAmountUsd.feeAllowance);

  const outcomeToken = tokens[payment.outcome_currency.toUpperCase()];

  const base: Base = {
    transactionDate: order.transactionDate,
    email: order.kycEmail,
    programId: order.programId,
    programName: order.programName,
    inHonorOf: order.inHonorOf,
    appUsed: order.appUsed,

    denomination: order.denomination,
    splitLiq: order.splitLiq,
    chainId: order.chainId,
    chainName: order.chainName,
    claimed: order.claimed,
    fiscalSponsored: order.fiscalSponsored,
    client: "apes",
    network: order.network,
    paymentMethod: "Crypto",
    isRecurring: false,

    destinationChainId: outcomeToken.network,
    donationFinalChainId: outcomeToken.network,
    donationFinalTxDate: finalizedTxISODate,
    donationFinalTxHash: payment.payment_id.toString(),
    donationFinalDenom: outcomeToken.symbol,

    ///KYC
    ...(order.kycEmail
      ? {
          kycEmail: order.kycEmail,
          title: order.title,
          fullName: order.fullName,
          ukGiftAid: order.ukGiftAid,
          ...("country" in order
            ? {
                streetAddress: order.streetAddress,
                city: order.city,
                state: order.state,
                zipCode: order.zipCode,
                country: order.country,
              }
            : {}),
        }
      : ({} as Donation.WithoutKYC)),
  };

  const builder = new TxBuilder();

  const processed_tip = applyFees(
    settledUsd.tip,
    fees.base,
    0,
    processingFee.tip,
    feeAllowance.tip
  );

  // Commission logic for tip
  const net_tip = settledUsd.tip - processingFee.tip;
  const tip_commission = net_tip * referral_commission_rate;
  const tip_fee_commission = processed_tip.excess * referral_commission_rate;
  const tip_tos: string[] = [];

  const BG_ENDOW_ID = 1293762;

  /** donation to a fund */
  if (order.fund_id && order.fund_name && order.fund_members) {
    const num = order.fund_members.length;
    let fund_net = 0;
    for (const member of order.fund_members) {
      const endow = await getEndow(member, order.network);
      if (!endow) {
        console.error(`Endowment ${member} not found!`);
        continue;
      }

      const processed = applyFees(
        settledUsd.endow / num,
        endow.hide_bg_tip ? fees.base : 0,
        endow.fiscal_sponsored ? fees.fiscal_sponsor : 0,
        processingFee.endow / num,
        feeAllowance.endow / num
      );

      // overwrite placeholder `claimed` and `fiscalSponsored` values
      base.claimed = endow.claimed;
      base.fiscalSponsored = endow.fiscal_sponsored;

      // Commission for endow
      const endow_commission_fee =
        (processed.excess + processed.fees.base + processed.fees.fsa) *
        referral_commission_rate;

      const overrides: Overrides = {
        endowId: endow.id,
        input: paidAmount.endow / num,
        inputUsd: paidAmountUsd.endow / num,
        settled: settledUsd.endow / num,
        net: processed.net,
        feeAllowance: feeAllowance.endow / num,
        excessFeeAllowance: processed.excess * (1 - referral_commission_rate),
        fees: processed.fees,
        txId: crypto.randomUUID(),
        fundTx: order.transactionId,
        fundId: order.fund_id,
        fundName: order.fund_name,
        endowName: endow.name,
      };

      // Commission transaction for fund member
      const c = commissionFn(
        {
          tip: tip_commission / num,
          fee: endow_commission_fee + tip_fee_commission / num,
          id: order.transactionId,
        },
        endow,
        order.network
      );
      if (c) {
        overrides.referrer = { id: c.to, commission: c.breakdown };
        builder.append(c.txs);
        tip_tos.push(c.to);
      }

      const _txs = settleTxs(base, overrides);
      builder.append(_txs);
      // net amount reflects fee-allowance add-back
      fund_net += processed.net;

      // creates single donation message record per fund member
      if (order.kycEmail && order.donor_public) {
        builder.put({
          TableName: tables.donation_messages,
          Item: buildDonationMsg({
            date: order.transactionDate,
            donor_id: order.kycEmail,
            donor_message: order.donor_message ?? "",
            donor_name: order.fullName,
            recipient_id: `${endow.id}`,
            transaction_id: order.transactionId,
            usd_value: order.usdValue / num,
          }),
        });
      }
    }
    await ap
      .send(fundContribUpdate(fund_net, order.fund_id))
      .catch(console.error);
    // to single endowments
  } else {
    const processed = applyFees(
      settledUsd.endow,
      order.hideBgTip ? fees.base : 0,
      order.fiscalSponsored ? fees.fiscal_sponsor : 0,
      processingFee.endow,
      feeAllowance.endow
    );
    const endow = await getEndow(order.endowmentId, order.network);
    if (!endow) {
      console.error(`Endowment ${order.endowmentId} not found!`);
      return;
    }
    // Commission for endow
    const endow_commission_fee =
      (processed.excess + processed.fees.base + processed.fees.fsa) *
      referral_commission_rate;

    const overrides: Overrides = {
      endowId: order.endowmentId,
      input: paidAmount.endow,
      inputUsd: paidAmountUsd.endow,
      settled: settledUsd.endow,
      net: processed.net,
      feeAllowance: feeAllowance.endow,
      excessFeeAllowance: processed.excess * (1 - referral_commission_rate),
      fees: processed.fees,
      txId: order.transactionId,
      endowName: order.charityName,
    };
    const c = commissionFn(
      {
        tip: tip_commission,
        fee: endow_commission_fee + tip_fee_commission,
        id: order.transactionId,
      },
      endow,
      order.network
    );
    if (c) {
      overrides.referrer = { id: c.to, commission: c.breakdown };
      builder.append(c.txs);
      tip_tos.push(c.to);
    }
    const _txs = settleTxs(base, overrides);
    builder.append(_txs);
  }

  //delete onhold record
  builder.del({
    TableName: tables.on_hold_donations,
    Key: {
      transactionId: order.transactionId,
    } as OnHoldDonation.PrimaryKey,
  });

  /** creates donation message for single fund/npo donation */
  if (order.kycEmail && order.donor_public) {
    const recipient_id = order.fund_id ? order.fund_id : `${order.endowmentId}`;
    builder.put({
      TableName: tables.donation_messages,
      Item: buildDonationMsg({
        date: order.transactionDate,
        donor_id: order.kycEmail,
        donor_message: order.donor_message ?? "",
        donor_name: order.fullName,
        recipient_id,
        transaction_id: order.transactionId,
        usd_value: order.usdValue,
      }),
    });
  }

  const overrides: Overrides = {
    endowId: BG_ENDOW_ID,
    input: paidAmount.tip,
    inputUsd: paidAmountUsd.tip,
    settled: settledUsd.tip,
    net: net_tip,
    feeAllowance: feeAllowance.tip,
    excessFeeAllowance: processed_tip.excess,
    fees: processed_tip.fees,
    txId: crypto.randomUUID(),
    parentTx: order.transactionId,
    endowName: "Better Giving",
  };

  if (tip_tos.length > 0) {
    overrides.referrer = {
      id: `internal:${tip_tos.join(",")}`,
      commission: {
        from_tip: tip_commission,
        from_fee: tip_fee_commission,
      },
    };
    overrides.net -= tip_commission;
    overrides.excessFeeAllowance -= tip_fee_commission;
  }
  const tipTxs = settleTxs(base, overrides);
  builder.append(tipTxs);

  return apes.send(new TransactWriteCommand({ TransactItems: builder.txs }));
};
