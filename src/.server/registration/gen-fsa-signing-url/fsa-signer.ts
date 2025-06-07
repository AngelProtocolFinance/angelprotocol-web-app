import type { DbRecord, Key } from "@better-giving/registration/db";
import type { Signer } from "@better-giving/registration/fsa";
import { isIrs501c3 } from "@better-giving/registration/models";
import { isDone } from "@better-giving/registration/step";
import { GetCommand, ap } from ".server/aws/db";
import { anvil } from ".server/sdks";

export const fsa_signer = async (eid: string): Promise<Signer> => {
  //get signer from signerEID, as this is the only available information in the page
  const response = await anvil.requestGraphQL({
    query: `query signer($eid: String!) {
        signer(eid: $eid) {
          name
          email
          clientUserId
        }
      }`,
    variables: { eid },
  });

  if (!response.data) throw response.errors;
  const { clientUserId: PK } = response.data.data.signer;

  const reg = await getReg(PK);
  if (!reg) throw `reg:${PK} not found`;

  if (!isDone.docs(reg)) throw "reg not yet done with docs";
  if (isIrs501c3(reg.docs))
    throw "fsa agreement signing only for npos not eligible for irs501c3";

  return {
    id: PK,
    first_name: reg.contact.first_name,
    last_name: reg.contact.last_name,
    email: reg.registrant_id,
    role:
      reg.contact.org_role === "other"
        ? (reg.contact.other_role ?? "")
        : (reg.contact.org_role ?? ""),
    docs: {
      org_name: reg.contact.org_name,
      hq_country: reg.org.hq_country,
      registration_number: reg.docs.registration_number,
      proof_of_reg: reg.docs.proof_of_reg,
      proof_of_identity: reg.docs.proof_of_identity,
      legal_entity_type: reg.docs.legal_entity_type,
      project_description: reg.docs.project_description,
    },
  };
};

export async function getReg(regId: string) {
  const cmd = new GetCommand({
    TableName: "registration",
    Key: {
      PK: `Reg#${regId}`,
      SK: `Reg#${regId}`,
    } satisfies Key,
  });

  return ap.send(cmd).then<DbRecord | undefined>((res) => res.Item as any);
}
