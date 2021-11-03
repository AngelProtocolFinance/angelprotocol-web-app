import { denoms } from "constants/currency";
import * as Yup from "yup";

export interface Values {
  amount: string;
  split: string;
  currency: denoms.uusd | denoms.btc | denoms.ether;
  isReady: boolean;
}

export const schema = Yup.object().shape({
  amount: Yup.number()
    .typeError("Amount must be a number")
    .required("Kindly specify amount")
    .positive("Amount must be greater than zero "),

  //taken care of by <Slider/> restrictions
  // split: Yup.number().min(50).max(100),
});
