import { delete_order } from "../../helpers/onhold";

export async function handleExpired(orderId: string) {
  return delete_order(orderId);
}
