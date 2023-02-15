const registrationRefKey = "__registration_ref";

export function getSavedRegistrationReference() {
  return localStorage.getItem(registrationRefKey);
}

export function storeRegistrationReference(ref: string) {
  localStorage.setItem(registrationRefKey, ref);
}

export function removeSavedRegistrationReference() {
  localStorage.removeItem(registrationRefKey);
}
