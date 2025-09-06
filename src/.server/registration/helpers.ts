import { npodb } from "../aws/db";
import { anvil } from ".server/sdks";

export const is_claimed = async (registration_number: string) =>
  npodb
    .npo_with_regnum(registration_number)
    .then((endow) => endow?.claimed ?? true);

export const reg_id_from_signer_eid = async (
  signer_eid: string
): Promise<string> => {
  //get signer from signerEID, as this is the only available information in the page
  const response = await anvil.requestGraphQL({
    query: `query signer($eid: String!) {
        signer(eid: $eid) {
          name
          email
          clientUserId
        }
      }`,
    variables: { eid: signer_eid },
  });

  if (!response.data) throw response.errors;
  const { clientUserId: PK } = response.data.data.signer;
  return PK;
};
