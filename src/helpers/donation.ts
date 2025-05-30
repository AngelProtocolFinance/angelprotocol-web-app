export function min_fee_allowance(
  amount: number,
  rate: number,
  flat = 0
): number {
  /**
   * fee(1) = amount * rate + flat
   * fee(2) = (amount + fee(1)) * rate + flat
   * fee(3) = (amount + fee(2)) * rate + flat
   * i.e. F₍ₙ₎ = a · ∑ᵏ⁼¹ⁿ (rᵏ) + f · ∑ᵏ⁼⁰ⁿ⁻¹ (rᵏ)
   * which converges to this formula: n approaches infinity
   */
  return (amount * rate + flat) / (1 - rate);
}
