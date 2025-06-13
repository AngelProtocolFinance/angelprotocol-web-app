import { anvil } from ".server/sdks";

export const signer_from_weld = async (
  weld_data_eid: string
): Promise<{ email: string }> => {
  const response = await anvil.requestGraphQL({
    query: `query weldData($eid: String!) {
    weldData(eid: $eid) {
      submissions {
        signer {
          email
        }
      }
    }
  }`,
    variables: {
      eid: weld_data_eid,
    },
  });
  if (response.errors?.length) throw response.errors;
  if (!response.data) throw response.statusCode;
  return response.data.data.weldData.submissions[0].signer;
};
