// import Action from "components/ActionButton/Action";
// import { useState } from "react";
// import useRemoveMember from "./useRemoveMember";
// import { useModalCloser } from "components/Modal/Modal";

// const RemoveMemberModal = ({ member, reloadMembers }: any) => {
//   const [isSubmitting, setSubmitting] = useState(false);
//   const closeModal = useModalCloser();
//   const removeAllianceMember = useRemoveMember();

//   const handleRemove = async () => {
//     setSubmitting(true);
//     console.log("member name => ", member.name);
//     const response: any = await removeAllianceMember(
//       member.name,
//       member.address
//     );
//     if (response) {
//       reloadMembers(response.data);
//     } else {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="container mx-auto w-full sm:w-3/4 max-w-500 bg-white rounded-lg min-h-115 p-5 text-center">
//       <span className="text-3xl font-bold inline-block mb-1">
//         Remove Member
//       </span>
//       <div className="flex flex-col mt-5">
//         <span className="text-xl text-center">
//           Hold up!! Are you sure you want to remove{" "}
//           <span className="font-bold">{member.name}</span> from the Angel
//           Alliance?
//         </span>
//       </div>
//       <div className="w-2/3 mx-auto flex flex-cols-2 align-items-center justify-between gap-2 mt-10">
//         <Action
//           onClick={closeModal}
//           title="Cancel"
//           classes="bg-orange w-32 h-10 mr-10"
//           disabled={isSubmitting}
//         />
//         <Action
//           onClick={handleRemove}
//           title="Remove"
//           classes="bg-orange w-32 h-10"
//           disabled={isSubmitting}
//           isLoading={isSubmitting}
//         />
//       </div>
//     </div>
//   );
// };

// export default RemoveMemberModal;

export default function ForRefactor() {
  return <></>;
}
