import * as Yup from "yup";

export const schema = Yup.object().shape({
  amount: Yup.number()
    .positive("Amount must be greater than zero ")
    .typeError("Amount is invalid")
    .test("max precision", "must not be greater than 6 digits", (number) =>
      /^\d+(\.\d{1,6})?$/.test(number as any)
    ),
  transactionDate: Yup.string().typeError("transactionDate is invalid"),
  transactionId: Yup.string().typeError("transactionId is invalid"),
  chainId: Yup.string().typeError("chainId is invalid"),
  email: Yup.string().email("email is invalid"),
  fullName: Yup.string(),
  streetAddress: Yup.string().typeError("fullName is invalid"),
  city: Yup.string().typeError("city is invalid"),
  state: Yup.string().typeError("state is invalid"),
  zipCode: Yup.string().typeError("zipCode is invalid"),
  country: Yup.string().typeError("country is invalid"),
});
