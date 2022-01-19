import * as Yup from "yup";
export const schema = Yup.object().shape({
  withdraw: Yup.number()
    .positive("Amount must be greater than zero ")
    .typeError("Amount is invalid")
    .test("max precision", "must not be greater than 6 digits", (number) =>
      /^\d+(\.\d{1,6})?$/.test(number as any)
    ),
});
