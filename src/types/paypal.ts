import type { Environment } from "@better-giving/schemas";
import type { DonationSource } from "./lists";

export type TItemId = "tip" | "fee-allowance" | "donation";

/** ${recipient_id, program_id, source_id} */
export type TCustomId = `${Environment}_${string}_${string}_${DonationSource}`;
export interface IIds {
  env: Environment;
  recipient: string;
  program: "nil" | (string & {});
  source: DonationSource;
}
export const to_ids = (id: string): IIds => {
  const [env, recipient, program, source] = id.split("_");
  return {
    env: env as Environment,
    recipient,
    program,
    source: source as DonationSource,
  };
};

export const to_custom_id = (x: IIds): TCustomId => {
  return `${x.env}_${x.recipient}_${x.program}_${x.source}` as TCustomId;
};
