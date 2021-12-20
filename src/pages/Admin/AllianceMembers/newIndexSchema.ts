import * as Yup from "yup";
export const newIndexFundSchema = Yup.object().shape({
  wallet: Yup.string().required("Wallet address is required"),
  name: Yup.string().required("Name is required"),
  icon: Yup.string().required("Logo is required"),
});
