import { Donation } from "types/aws";

export type TableProps = {
  donations: Donation[];
  classes?: string;
};
