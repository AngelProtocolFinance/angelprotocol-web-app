import { maskitoNumberOptionsGenerator } from "@maskito/kit";
export const dollarMaskOpts = maskitoNumberOptionsGenerator({
  min: 0,
  prefix: "$ ",
  thousandSeparator: ",",
});
