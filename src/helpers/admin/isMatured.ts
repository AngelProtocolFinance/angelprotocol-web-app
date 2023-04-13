export const isMatured = (maturity: number) =>
  maturity <= Math.floor(new Date().getTime() / 1000);
