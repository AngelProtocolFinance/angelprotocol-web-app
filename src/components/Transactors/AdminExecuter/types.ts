import { TagPayloads } from "slices/transaction/types";

export type AdmiExecuterProps = {
  proposal_id: number;
  tagPayloads?: TagPayloads;
};
