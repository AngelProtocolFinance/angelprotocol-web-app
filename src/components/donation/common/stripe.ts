import { loadStripe } from "@stripe/stripe-js";
import { PUBLIC_STRIPE_KEY } from "constants/env";

export const stripe_promise = loadStripe(PUBLIC_STRIPE_KEY);
