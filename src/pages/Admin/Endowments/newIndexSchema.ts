import * as Yup from "yup";
export const newIndexFundSchema = Yup.object().shape({
  id: Yup.string().required("ID is required"),
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
});
