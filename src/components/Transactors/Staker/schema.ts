import { requiredTokenAmount } from "schemas/number";
import * as Yup from "yup";
export const schema = Yup.object().shape({
  amount: requiredTokenAmount,
});
