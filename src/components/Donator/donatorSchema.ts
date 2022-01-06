import * as Yup from "yup";

export const donatorSchema = Yup.object().shape({
  otherAmount: Yup.number().when("amount", {
    is: (amount: string) => !amount,
    then: Yup.number()
      .typeError("Amount must be a number")
      .required("Kindly specify amount")
      .positive("Amount must be greater than zero "),
  }),
  // No need to add more validations to 'amount' due to the following:
  // 1. This value is hardcoded in radio buttons
  // 2. When no radio button associated with this field is selected, that must mean
  //    that the 'otherAmount' radio button IS selected, in which case its validations apply
  amount: Yup.number(),
  receiptRequested: Yup.boolean(),
  fullName: Yup.string().when("receiptRequested", {
    is: true,
    then: Yup.string().required("Please enter your full name"),
  }),
  email: Yup.string().when("receiptRequested", {
    is: true,
    then: Yup.string()
      .email("Must be a valid email address")
      .required("Please enter your email address"),
  }),
  streetAddress: Yup.string().when("receiptRequested", {
    is: true,
    then: Yup.string().required("Street address is required"),
  }),
  city: Yup.string().when("receiptRequested", {
    is: true,
    then: Yup.string().required("City or municipality is required"),
  }),
  zipCode: Yup.string().when("receiptRequested", {
    is: true,
    then: Yup.string().required("ZIP or Postal code is required"),
  }),
  stateAddress: Yup.string().when("receiptRequested", {
    is: true,
    then: Yup.string().required("State, region or province is required"),
  }),
  country: Yup.string().when("receiptRequested", {
    is: true,
    then: Yup.string().required("Country is required"),
  }),

  //taken care of by <Slider/> restrictions
  // split: Yup.number().min(50).max(100),
});
