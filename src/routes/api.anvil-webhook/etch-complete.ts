import type { Key } from "@better-giving/registration/db";
import type { FsaDocs } from "@better-giving/registration/models";
import type { Step6 } from "@better-giving/registration/step";
import type { Update } from "@better-giving/registration/update";
import { tables } from "@better-giving/types/list";
import type { AttrNames } from "@better-giving/types/utils";
import { signer_fn } from "./helpers";
import type { EtchPacket } from "./types";
import { UpdateCommand, ap } from ".server/aws/db";

export const etch_complete = async (
  data: EtchPacket.Data,
  base_url: string
) => {
  const { signers, documentGroup } = data;
  const signer = await signer_fn(signers[0].eid);

  const names: Partial<AttrNames<Step6 & FsaDocs>> = {
    "#docs": "docs",
    "#fsa_signed_doc_url": "fsa_signed_doc_url",
    "#irs501c3": "irs501c3",
    "#update_type": "update_type",
    "#updated_at": "updated_at",
  };

  const command = new UpdateCommand({
    Key: {
      PK: `Reg#${signer.eid}`,
      SK: `Reg#${signer.eid}`,
    } satisfies Key,
    TableName: tables.registration,
    UpdateExpression:
      "SET #docs.#fsa_signed_doc_url = :url, #updated_at = :updated_at, #update_type = :update_type",
    ConditionExpression: `#irs501c3 = :false AND attribute_exists(#docs) AND attribute_type(#docs,:type)`,
    ExpressionAttributeNames: names,
    ExpressionAttributeValues: {
      ":url": `${base_url}/api/anvil-doc/${documentGroup.eid}`,
      ":type": "M",
      ":false": false,
      ":updated_at": new Date().toISOString(),
      ":update_type": "docs" satisfies Update["type"],
    },
  });
  return ap.send(command);
};
