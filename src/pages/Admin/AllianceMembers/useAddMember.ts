// import * as Yup from "yup";
// import { toast } from "react-toastify";
// import { useCreateNewMemberMutation } from "services/aws/alliance/alliance";
// import { Details } from "services/aws/alliance/types";

// export const MemberDataSchema = Yup.object().shape({
//   address: Yup.string()
//     .required("Please enter the wallet address")
//     .max(44, "Wallet address is invalid")
//     .matches(/^terra[a-z0-9]{39}$/i, "Wallet address is invalid"),
//   name: Yup.string().required("Please enter the name"),
//   url: Yup.string().required("Please enter the url"),
// });

// export const useAddMember = () => {
//   const [createNewMember] = useCreateNewMemberMutation();
//   const readFileToBase64 = (file: File) =>
//     new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file as Blob);

//       reader.onload = () => {
//         return resolve(reader.result);
//       };
//       reader.onerror = (error) => reject(error);
//     });

//   const addMember = async (data: Details) => {
//     const response: any = await createNewMember(data);
//     const result = response.data ? response : response.error;
//     if (result.status === 500) {
//       toast.error("Creating new member was failed. Please try again.");
//     } else if (result.error) {
//       toast.error(result.error.data.message);
//     } else {
//       if (
//         result.status === 400 ||
//         result.status === 401 ||
//         result.status === 403 ||
//         result.status === 415
//       ) {
//         toast.error(result.data.message);
//       } else {
//         toast.success("Created successfully.");
//         return result;
//       }
//     }
//     return false;
//   };

//   return { addMember, readFileToBase64 };
// };

export default function ForRefactor() {
  return "";
}
