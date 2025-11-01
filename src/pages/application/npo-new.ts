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

export const npo_new = async (r: NonNullable<Progress["banking"]>) => {
  const rid = referral_id("NPO");
  const ecfr: EndowContentFromReg = {
    active_in_countries: r.o_activity_countries ?? [],
    endow_designation: r.o_designation,
    fiscal_sponsored: r.o_type === "other",
    hq_country: r.o_hq_country,
    kyc_donors_only: true,
    name: r.o_name,
    registration_number:
      r.o_type === "501c3" ? r.o_ein : r.o_registration_number,
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
        status: "03",
        status_approved_npo_id: id,
      })
    );
    txs.update(npodb.npo_update_txi(id, ecfr));
    txs.put(baldb.balance_put_txi(id));

    const tx_cmd = new TransactWriteCommand({ TransactItems: txs.all });
    await npodb.client.send(tx_cmd);
    return id;
  }

  ///////////// APPROVAL OF NEW ENDOWMENT /////////////
  const npo_id = await npodb.npo_count_inc();
  const wacc = await wise.v2_account(+r.o_bank_id);
  const bank_new: IApplication = {
    wiseRecipientID: r.o_bank_id,
    endowmentID: npo_id,
    bankStatementFile: {
      publicUrl: r.o_bank_statement,
      name: r.o_bank_statement,
    },
    bankSummary: wacc.longAccountSummary,
    rejectionReason: "",
  };

  const new_endow: INpo = {
    ...ecfr,
    env,
    id: npo_id,
    social_media_urls: {},
    sdgs: [],
  };
  const txs = new Txs();
  txs.put(bappdb.bapp_put_txi(bank_new, "approved"));
  txs.put(userdb.userxnpo_put_txi(npo_id, r.r_id));
  txs.update(
    regdb.reg_update_txi(r.id, {
      status: "03",
      status_approved_npo_id: npo_id,
    })
  );
  txs.put({ TableName: NpoDb.table, Item: npodb.npo_record(new_endow) });
  txs.put(baldb.balance_put_txi(npo_id));

  const tx_cmd = new TransactWriteCommand({ TransactItems: txs.all });
  await npodb.client.send(tx_cmd);

  return npo_id;
};
