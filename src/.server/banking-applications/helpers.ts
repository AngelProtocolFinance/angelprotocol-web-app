/**
 * increments number which result is lexicographically greater than the input number
 * e.g. 8,9,91,92,93
 * where we skip `10` as `10` is lexicographically less than `9`
 * */
export function lex_increase(num: number) {
  return num % 10 === 9 ? num * 10 + 1 : num + 1;
}
