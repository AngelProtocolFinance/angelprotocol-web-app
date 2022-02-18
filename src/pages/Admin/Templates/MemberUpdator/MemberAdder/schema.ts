import * as Yup from "yup";
export const schema = Yup.object().shape({
  addr: Yup.string()
    .required("wallet address is required")
    .test("is valid", "wallet address format is not valid", (address) =>
      /^terra[a-z0-9]{39}$/i.test(address as string)
    ),
  weight: Yup.number()
    .required("weight is required")
    .typeError("weight must be a number"),
});
