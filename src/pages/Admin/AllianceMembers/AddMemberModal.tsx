// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { DropzoneArea } from "material-ui-dropzone";
// import { useState } from "react";
// import { useModalCloser } from "components/Modal/Modal";
// import { useAddMember, MemberDataSchema } from "./useAddMember";
// import Action from "components/ActionButton/Action";
// import { Details } from "services/aws/alliance/types";

// const NewMemberModal = ({ reloadMembers }: any) => {
//   const [fileContent, setFileContent] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const closeModal = useModalCloser();
//   const { readFileToBase64, addMember } = useAddMember();
//   const {
//     reset,
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(MemberDataSchema),
//     defaultValues: {
//       address: "",
//       name: "",
//       url: "",
//       icon: "",
//     } as Details,
//   });

//   const onSubmit = async (data: Details) => {
//     setIsLoading(true);
//     const postData = {
//       ...data,
//       icon: fileContent,
//       iconLight: false,
//       otherWallets: [],
//     } as Details;
//     const response: any = await addMember(postData);
//     if (response) {
//       reloadMembers(response.data);
//     } else {
//       reset();
//       setIsLoading(false);
//     }
//   };

//   const readFiles = async (files: any) => {
//     let content: any;
//     if (files.length > 0) {
//       content = await readFileToBase64(files[0]);
//       setFileContent(content);
//     }
//   };

//   return (
//     <div className="container mx-auto w-full sm:w-3/4 max-w-600 bg-white rounded-lg min-h-115 p-5 text-center max-h-3/4 overflow-y-scroll">
//       <span className="text-2xl font-semibold inline-block mb-1">
//         New Alliance Member
//       </span>
//       <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
//         <div className="my-10 text-left relative">
//           <label
//             htmlFor="wallet"
//             className="text-md text-gray-600 font-bold mb-2 inline-block"
//           >
//             Wallet
//           </label>
//           <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
//             <input
//               type="text"
//               className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200"
//               placeholder="Wallet address"
//               id="wallet"
//               {...register("address")}
//             />
//           </div>
//           {errors.address?.type === "required" && (
//             <p className="text-xs sm:text-sm text-failed-red mt-1 pl-1">
//               Wallet is required
//             </p>
//           )}
//           {(errors.address?.type === "pattern" ||
//             errors.address?.type === "maxLength") && (
//             <p className="text-xs sm:text-sm text-failed-red mt-1 pl-1">
//               Wallet is invalid
//             </p>
//           )}
//           <label
//             htmlFor="name"
//             className="text-md text-gray-600 font-bold my-2 inline-block"
//           >
//             Name
//           </label>
//           <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
//             <input
//               type="text"
//               className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200"
//               placeholder="Alliance member name"
//               id="name"
//               {...register("name", { required: true })}
//             />
//           </div>
//           {errors.name && (
//             <p className="text-xs sm:text-sm text-failed-red mt-1 pl-1">
//               Alliance member name is required
//             </p>
//           )}
//           <label
//             htmlFor="url"
//             className="text-md text-gray-600 font-bold my-2 inline-block"
//           >
//             URL
//           </label>
//           <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
//             <input
//               type="text"
//               className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200"
//               placeholder="URL of alliance member"
//               id="url"
//               {...register("url", { required: true })}
//             />
//           </div>
//           {errors.url && (
//             <p className="text-xs sm:text-sm text-failed-red mt-1 pl-1">
//               URL of alliance member is required
//             </p>
//           )}
//           <label
//             htmlFor="icon"
//             className="text-md text-gray-600 font-bold my-2 inline-block"
//           >
//             Logo
//           </label>
//           <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
//             <div className="form-control rounded-md flex justify-between items-center w-full h-64">
//               <DropzoneArea
//                 onChange={readFiles}
//                 dropzoneClass="text-gray-400"
//                 filesLimit={1}
//                 acceptedFiles={["image/*"]}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="w-full flex flex-cols-2 align-items-center justify-end gap-2">
//           <div>
//             <Action
//               onClick={closeModal}
//               title="Cancel"
//               classes="bg-orange w-32 h-10 mr-10"
//               disabled={isLoading}
//             />
//             <Action
//               submit
//               title="Create"
//               classes="bg-orange w-32 h-10"
//               disabled={isLoading}
//               isLoading={isLoading}
//             />
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default NewMemberModal;

export default function ForRefactor() {
  return <></>;
}
