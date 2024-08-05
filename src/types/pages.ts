import type { GuestDonor } from "./aws";

export type DonateThanksState = {
  guestDonor?: GuestDonor;
  recipientName?: string;
  recipientId?: number;
  bankVerificationUrl?: string;
  microdepositArrivalDate?: number;
};
