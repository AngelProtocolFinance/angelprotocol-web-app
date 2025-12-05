import { paypal_currencies } from "constants/paypal";
import { addMinutes } from "date-fns";
import { rd } from "helpers/decimal";
import { paypal_envs } from ".server/env";
import { paypal } from ".server/sdks";

export const create_subs = async (
  total: number,
  currency: string,
  onhold_id: string
): Promise<string> => {
  const d = paypal_currencies[currency];
  const plan_id = paypal_envs.plans[currency];

  const { id = "invalid subs id" } = await paypal.create_subscription({
    custom_id: onhold_id,
    plan_id: plan_id,
    quantity: rd(total, 0),
    auto_renewal: true,
    start_time: addMinutes(new Date(), 5).toISOString(),
  });

  return id;
};
