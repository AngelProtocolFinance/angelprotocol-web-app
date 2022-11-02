import { ProviderId } from "../types";

const key = "__connected_provider";

export function storeConnectedProvider(providerId: ProviderId) {
  localStorage.setItem(key, providerId);
}

export function getConnectedProvider(): ProviderId | undefined {
  return localStorage.getItem(key) as ProviderId;
}

export function removeConnectedProvider() {
  localStorage.removeItem(key);
}
