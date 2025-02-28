import { deleteOrder } from "../helpers";

export async function handleExpired(orderId: string) {
  return deleteOrder(orderId);
}
