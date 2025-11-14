/**
 * paypal currency rules for a **usd receiving account**.
 *
 * - key = iso 4217 currency code (uppercase)
 * - value = number of decimal places paypal accepts
 *
 * currencies **not commented out** are fully supported:
 *   - paypal will accept the payment
 *   - amount will be auto-converted to usd (except usd itself)
 *
 * currencies **commented out** are **problematic** and should **not be offered**:
 *   - note 3 currencies → blocked for non-local receivers
 *
 * source: https://developer.paypal.com/api/rest/reference/currency-codes/
 */
export const currencies: Record<string, 0 | 2> = {
  USD: 2,
  AUD: 2,
  CAD: 2,
  EUR: 2,
  GBP: 2,
  CHF: 2,
  CZK: 2,
  DKK: 2,
  HKD: 2,
  ILS: 2,
  MXN: 2,
  NZD: 2,
  NOK: 2,
  PHP: 2,
  PLN: 2,
  RUB: 2, // fully supported, auto-converts to usd
  SGD: 2,
  SEK: 2,
  THB: 2,

  // ──────────────────────────────────────────────────────────────
  // no-decimal currencies (note 1) – must send **whole numbers only**
  // ──────────────────────────────────────────────────────────────
  /** @example 1500 (not 1500.50) */
  JPY: 0,
  /** @example 2999 (not 2999.99) */
  HUF: 0,
  /** @example 999 (not 999.00) */
  TWD: 0,

  // ──────────────────────────────────────────────────────────────
  // auto-converts to usd (note 2) – paypal adds spread/fee
  // ──────────────────────────────────────────────────────────────
  /** auto-converted to usd + paypal fee. only brazilian accounts can hold brl. */
  BRL: 2,

  // ──────────────────────────────────────────────────────────────
  // problematic – do not use (note 3)
  // these are **blocked** for non-local receivers → payment fails
  // ──────────────────────────────────────────────────────────────
  // /** blocked – only in-country (china) paypal accounts can receive cny */
  // CNY: 2,
  //
  // /** blocked – only in-country (malaysia) paypal accounts can receive myr */
  // MYR: 2,
};
