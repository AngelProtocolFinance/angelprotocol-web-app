import type { Balance } from "@better-giving/balance";
import type { Endow } from "@better-giving/endowment/db";
import type { Verdict } from "@better-giving/registration/approval";
import type { ApplicationDbRecord } from "@better-giving/registration/db";
import { type UNSDG_NUM, isIrs501c3 } from "@better-giving/registration/models";
import { tables } from "@better-giving/types/list";
import { addYears } from "date-fns";
import { referral_id } from "helpers/referral";
import {
  PutCommand,
  TransactWriteCommand,
  UpdateCommand,
  ap,
  apes,
} from "../../aws/db";
import { env } from "../../env";
import {
  bankingRecord,
  dbUpdate,
  endowAdmin,
  nextEndowId,
  regUpdate,
} from "./helpers";
import type { EndowContentFromReg } from "./types";

// registrations/{id}/submit
export const review = async (verdict: Verdict, reg: ApplicationDbRecord) => {
  // Fetch registration record

  ///////////// REJECTION /////////////
  if (verdict.verdict === "rejected") {
    const cmd = new UpdateCommand(
      regUpdate<"standalone">(reg, { rejection: verdict.reason })
    );
    await ap.send(cmd);
    console.info("application rejected!", reg.id);
    return;
  }

  const rid = referral_id("NPO");
  const ecfr: EndowContentFromReg = {
    active_in_countries: reg.org.active_in_countries ?? [],
    endow_designation: reg.org.designation,
    fiscal_sponsored: !reg.irs501c3,
    hq_country: reg.org.hq_country,
    kyc_donors_only: reg.org.kyc_donors_only,
    name: reg.contact.org_name,
    registration_number: isIrs501c3(reg.docs)
      ? reg.docs.ein
      : reg.docs.registration_number,
    sdgs: reg.org.un_sdg as UNSDG_NUM[],
    url: reg.org.website,
    claimed: true,
    referral_id: rid,
    gsi2PK: `Rid#${rid}`,
    gsi2SK: `Rid#${rid}`,
  };

  if (reg.referrer) {
    const onboarded = new Date();
    const expiry = addYears(onboarded, 3).toISOString();
    ecfr.referrer = reg.referrer;
    ecfr.gsi1PK = `ReferredBy#${reg.referrer}`;
    ecfr.referrer_expiry = expiry;
    ecfr.gsi1SK = expiry;
  }

  ///////////// APPROVAL OF CLAIM /////////////
  if (isIrs501c3(reg.docs) && reg.docs.claim) {
    const { id } = reg.docs.claim;
    //init balances first: if endow creation fails, would simply override prev id
    await initBalance(id);

    const transactionCommand = new TransactWriteCommand({
      TransactItems: [
        { Put: await bankingRecord(reg, id) },
        { Put: endowAdmin(reg.registrant_id, id) },
        { Update: regUpdate<"tx">(reg, { endowment_id: id }) },
        {
          Update: {
            TableName: tables.endowments_v3,
            Key: {
              SK: env,
              PK: `Endow#${id}`,
            } satisfies Endow.Keys,
            ...dbUpdate(ecfr),
          },
        },
      ],
    });

    await ap.send(transactionCommand);
    console.info("claim approved!", id);
    return;
  }

  ///////////// APPROVAL OF NEW ENDOWMENT /////////////
  const newEndowID = await nextEndowId(env);

  //init balances first: if endow creation fails, would simply override prev id
  await initBalance(newEndowID);

  const newEndow: Endow.DbRecord = {
    ...ecfr,
    env,
    PK: `Endow#${newEndowID}`,
    SK: env,
    id: newEndowID,
    social_media_urls: {},
  };

  const transactionCommand = new TransactWriteCommand({
    TransactItems: [
      { Put: await bankingRecord(reg, newEndowID) },
      { Put: endowAdmin(reg.registrant_id, newEndowID) },
      { Update: regUpdate<"tx">(reg, { endowment_id: newEndowID }) },
      {
        Put: {
          TableName: tables.endowments_v3,
          Item: newEndow,
        },
      },
    ],
  });

  await ap.send(transactionCommand);
  console.info("new endow created!", newEndowID);
  return;
};

async function initBalance(endowId: number) {
  return apes.send(
    new PutCommand({
      TableName: tables.balances,
      Item: {
        version: 2,
        contributionsCount: 0,
        donationsBal: 0,
        id: endowId,
        network: env,
        payoutsMade: 0,
        payoutsMadeDonation: 0,
        payoutsMadeGrant: 0,
        payoutsPending: 0,
        sfInvestments: 0,
        sfPendingContributions: 0,
        sfWeeklyContributions: 0,
        sustainabilityFundBal: 0,
        totalContributions: 0,
        totalGrantsEarned: 0,
        totalContributionsViaMarketplace: 0,
        totalContributionsViaWidget: 0,
        totalBaseFees: 0,
        totalFiscalSponsorFees: 0,
        totalProcessingFees: 0,
        totalTips: 0,
      } satisfies Balance.DBRecord,
    })
  );
}
