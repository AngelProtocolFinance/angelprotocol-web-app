import { ProviderId } from "../types";

const key = "__connected_provider";

export function storeConnectedProviderId(providerId: ProviderId) {
  localStorage.setItem(key, providerId);
}

export function getConnectedProviderId(): ProviderId | undefined {
  return localStorage.getItem(key) as ProviderId;
}

export function removeConnectedProviderId() {
  localStorage.removeItem(key);
}
