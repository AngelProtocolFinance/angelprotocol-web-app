import { anvil } from ".server/sdks";

interface WeldData {
  documentGroup: {
    eid: string;
  };
}
export async function weld_data_fn(eid: string): Promise<WeldData> {
  const response = await anvil.requestGraphQL({
    query: `query WeldDataQuery($eid: String!) {
        data: weldData(eid: $eid) {
          documentGroup {
            eid
          }
          
        }
      }`,
    variables: { eid },
  });

  if (!response.data) throw response.errors;
  return response.data.data.data;
}
