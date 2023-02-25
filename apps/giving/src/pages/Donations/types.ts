import { Donation } from "@giving/types/aws";

export type TableProps = {
  donations: Donation[];
  classes?: string;
};
