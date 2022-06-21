import { Decimal as CosmJsDecimal, Uint64 } from "@cosmjs/math";

/**
 * Wrapper class to allow abstracting away the exact package used to implement decimal operations
 */
export default class Decimal {
  private value: CosmJsDecimal;

  /**
   * Creates an instance of `Decimal` class
   *
   * @param value Number to perform operations on
   * @param fractionalDigits Number of fractional digits of the number, defaults to 6 (converts u{token_name} to {TOKEN_NAME}, e.g. uatom = ATOM*1e6)
   */
  constructor(value: number | string, fractionalDigits = 6) {
    this.value = CosmJsDecimal.fromAtomics(value.toString(), fractionalDigits);
  }

  public plus(b: Decimal): Decimal {
    const result = this.value.plus(b.value);
    return new Decimal(result.atomics);
  }

  public minus(b: Decimal): Decimal {
    const result = this.value.minus(b.value);
    return new Decimal(result.atomics);
  }

  public multiply(b: number | string): Decimal {
    const result = this.value.multiply(Uint64.fromString(b.toString()));
    return new Decimal(result.atomics);
  }

  /**
   * Returns an approximation as a number type. Only use this if no
   * exact calculation is required.
   */
  public toNumber(): number {
    return this.value.toFloatApproximation();
  }

  public isGreaterThan(b: Decimal): boolean {
    return this.value.isGreaterThan(b.value);
  }
}
