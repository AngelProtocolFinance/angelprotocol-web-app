import { tokenAmountSchema } from "schemas/schemas";
import * as Yup from "yup";

export const schema = Yup.object().shape({
  amount: tokenAmountSchema,
});
