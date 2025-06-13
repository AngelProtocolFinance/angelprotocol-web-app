import type { Key } from "@better-giving/registration/db";
import type { Docs as SignerDocs } from "@better-giving/registration/fsa";
import type { FsaDocs } from "@better-giving/registration/models";
import type { Step6 } from "@better-giving/registration/step";
import type { AttrNames } from "@better-giving/types/utils";
import { UpdateCommand, ap } from ".server/aws/db";

export const save_docs = async (
  reg_id: string,
  docs: SignerDocs,
  signing_url: string
) => {
  const names: Partial<AttrNames<Step6>> = {
    "#docs": "docs",
    "#irs501c3": "irs501c3",
  };
  const cmd = new UpdateCommand({
    Key: {
      PK: `Reg#${reg_id}`,
      SK: `Reg#${reg_id}`,
    } satisfies Key,
    TableName: "registration",
    UpdateExpression: `SET #docs = :docs`,
    ConditionExpression: `#irs501c3 = :false`,
    ExpressionAttributeNames: names,
    ExpressionAttributeValues: {
      ":docs": {
        ...docs,
        fsa_signing_url: signing_url,
      } satisfies FsaDocs,
      ":false": false,
    },
    ReturnValues: "UPDATED_NEW",
  });

  await ap.send(cmd);
  return signing_url;
};
