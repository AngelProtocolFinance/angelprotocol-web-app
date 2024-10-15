import type { Donation } from "types/aws";

export type Page = { Items: Donation.Record[]; nextPage?: number };
