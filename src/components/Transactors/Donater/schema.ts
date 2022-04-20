import * as Yup from "yup";
import { requiredTokenAmount } from "schemas/number";

export const schema = Yup.object().shape({
  amount: requiredTokenAmount,
});
