import { denoms } from "constants/currency";
import * as Yup from "yup";

export interface Values {
  amount: string;
  split: string;
  currency: denoms.uusd | denoms.btc | denoms.ether;
}

export const schema = Yup.object().shape({
  amount: Yup.number()
    .required("Kindly specify amount")
    .typeError("Amount must be a number")
    .positive("Amount must be greater than zero ")
    .test("max precision", "must not be greater than 6 digits", (number) =>
      /^\d+(\.\d{1,6})?$/.test(number as any)
    ),

  //taken care of by <Slider/> restrictions
  // split: Yup.number().min(50).max(100),
});
