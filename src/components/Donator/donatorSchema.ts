import * as Yup from "yup";

export const donatorSchema = Yup.object().shape({
  amount: Yup.number()
    .typeError("Amount must be a number")
    .required("Kindly specify amount")
    .positive("Amount must be greater than zero "),
  split: Yup.number().min(50).max(100),
});
