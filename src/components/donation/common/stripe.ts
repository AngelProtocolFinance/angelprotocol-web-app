import { loadStripe } from "@stripe/stripe-js";
import { stripe_public_key } from "constants/env";

export const stripe_promise = loadStripe(stripe_public_key);
