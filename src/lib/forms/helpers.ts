/**
 *
 * @param expiration - iso date, null if not expiring
 */
export function is_form_expired(expiration: string | null): boolean {
  if (expiration === null) {
    return false;
  }
  return new Date(expiration) < new Date();
}
