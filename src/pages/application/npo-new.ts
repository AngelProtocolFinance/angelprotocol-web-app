import type { IApplication } from "@better-giving/banking-applications";
import { Txs } from "@better-giving/db";
import { type INpo, type INpoDb, NpoDb } from "@better-giving/endowment";
import type { Progress } from "@better-giving/reg";
import { addYears } from "date-fns";
import { referral_id } from "helpers/referral";
import {
  TransactWriteCommand,
  baldb,
  bappdb,
  npodb,
  regdb,
  userdb,
} from ".server/aws/db";
import { env } from ".server/env";
import { wise } from ".server/sdks";

export type EndowContentFromReg = Pick<
  INpoDb,
  | "active_in_countries"
  | "endow_designation"
  | "fiscal_sponsored"
  | "hq_country"
  | "kyc_donors_only"
  | "name"
  | "registration_number"
  | "url"
  | "claimed"
  | "referrer"
  | "referrer_expiry"
  | "referral_id"
>;

export const npo_new = async (r: NonNullable<Progress["step5"]>) => {
  const rid = referral_id("NPO");
  const ecfr: EndowContentFromReg = {
    active_in_countries: r.o_activity_countries ?? [],
    endow_designation: r.o_designation,
    fiscal_sponsored: r.o_type === "501c3",
    hq_country: r.o_hq_country,
    kyc_donors_only: true,
    name: r.o_name,
    registration_number: r.o_registration_number,
    url: r.o_website,
    claimed: true,
    referral_id: rid,
  };

  if (r.rm === "referral" && r.rm_referral_code) {
    const onboarded = new Date();
    const expiry = addYears(onboarded, 3).toISOString();
    ecfr.referrer = r.rm_referral_code;
    ecfr.referrer_expiry = expiry;
  }

  ///////////// APPROVAL OF CLAIM /////////////
  if (r.claim) {
    const { id } = r.claim;
    //init balances first: if endow creation fails, would simply override prev id
    await baldb.balance_put(id);
    const wacc = await wise.v2_account(+r.o_bank_id);
    const bank_new: IApplication = {
      wiseRecipientID: r.o_bank_id,
      endowmentID: id,
      bankStatementFile: {
        publicUrl: r.o_bank_statement,
        name: r.o_bank_statement,
      },
      bankSummary: wacc.longAccountSummary,
      rejectionReason: "",
    };

    const txs = new Txs();
    txs.put(bappdb.bapp_put_txi(bank_new, "approved"));
    txs.put(userdb.userxnpo_put_txi(id, r.r_id));
    txs.update(
      regdb.reg_update_txi(r.id, {
        update_type: "submit",
        status: "04",
        status_approved_npo_id: id,
      })
    );
    txs.update({
      TableName: NpoDb.name,
      Key: npodb.key_npo(id),
      ...npodb.npo_update_comps(ecfr),
    });

    const tx_cmd = new TransactWriteCommand({ TransactItems: txs.all });
    await npodb.client.send(tx_cmd);
    return id;
  }

  ///////////// APPROVAL OF NEW ENDOWMENT /////////////
  const newEndowID = await npodb.npo_count_inc();
  const wacc = await wise.v2_account(+r.o_bank_id);
  const bank_new: IApplication = {
    wiseRecipientID: r.o_bank_id,
    endowmentID: newEndowID,
    bankStatementFile: {
      publicUrl: r.o_bank_statement,
      name: r.o_bank_statement,
    },
    bankSummary: wacc.longAccountSummary,
    rejectionReason: "",
  };

  //init balances first: if endow creation fails, would simply override prev id
  await baldb.balance_put(newEndowID);

  const newEndow: INpo = {
    ...ecfr,
    env,
    id: newEndowID,
    social_media_urls: {},
    sdgs: [],
  };
  const txs = new Txs();
  txs.put(bappdb.bapp_put_txi(bank_new, "approved"));
  txs.put(userdb.userxnpo_put_txi(newEndowID, r.r_id));
  txs.update(
    regdb.reg_update_txi(r.id, {
      update_type: "submit",
      status: "04",
      status_approved_npo_id: newEndowID,
    })
  );
  txs.put({ TableName: NpoDb.table, Item: npodb.npo_record(newEndow) });

  const tx_cmd = new TransactWriteCommand({ TransactItems: txs.all });
  await npodb.client.send(tx_cmd);

  return newEndowID;
};
