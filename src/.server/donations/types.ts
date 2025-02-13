import type { Donation, OnHoldDonation } from "@better-giving/donation";
//common attributes
export type DBRecord = OnHoldDonation.DBRecord & Donation.DBRecord;
export type Key = keyof DBRecord;
//common index
export type Index = Extract<Donation.Index, OnHoldDonation.Index>;
