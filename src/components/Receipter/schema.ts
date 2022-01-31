import * as Yup from "yup";

export const schema = Yup.object().shape({
  amount: Yup.number()
    .positive("Amount must be greater than zero ")
    .typeError("Amount is invalid")
    .test("max precision", "must not be greater than 6 digits", (number) =>
      /^\d+(\.\d{1,6})?$/.test(number as any)
    ),
  transactionDate: Yup.string().typeError("TransactionDate is invalid"),
  transactionId: Yup.string().typeError("TransactionId is invalid"),
  chainId: Yup.string().typeError("ChainId is invalid"),
  email: Yup.string().email("Email is invalid").required("Email is necessary."),
  fullName: Yup.string().required("Full Name is necessary."),
  streetAddress: Yup.string()
    .typeError("Address is invalid")
    .required("Address is necessary."),
  city: Yup.string()
    .typeError("City is invalid")
    .required("City is necessary."),
  state: Yup.string()
    .typeError("State is invalid")
    .required("State is necessary."),
  zipCode: Yup.string()
    .typeError("ZipCode is invalid")
    .required("ZipCode is necessary."),
  country: Yup.string()
    .typeError("Country is invalid")
    .required("Country is necessary."),
});
