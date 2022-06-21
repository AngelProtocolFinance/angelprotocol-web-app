import { Decimal as CosmJsDecimal, Uint64 } from "@cosmjs/math";

/**
 * Wrapper class to allow abstracting away the exact package used
 * to implement arbitrary precision non-negative decimal operations.
 */
export default class Decimal {
  public value: CosmJsDecimal;

  /**
   * Creates an instance of `Decimal` class
   *
   * @param atomic Number with the whole and fractional parts merged
   * @param fractionalDigits Number of fractional digits of the number, defaults to 0
   */
  constructor(atomic: number | string, fractionalDigits = 0) {
    this.value = CosmJsDecimal.fromAtomics(atomic.toString(), fractionalDigits);
  }

  public plus(b: Decimal): Decimal {
    const result = this.value.plus(b.value);
    return new Decimal(result.atomics, this.value.fractionalDigits);
  }

  public minus(b: Decimal): Decimal {
    const result = this.value.minus(b.value);
    return new Decimal(result.atomics, this.value.fractionalDigits);
  }

  public multiply(b: number | string): Decimal {
    const result = this.value.multiply(Uint64.fromString(b.toString()));
    return new Decimal(result.atomics, this.value.fractionalDigits);
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
