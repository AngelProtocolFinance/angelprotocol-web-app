// import { Listbox } from "@headlessui/react";
// import { Fragment } from "react";
// import { useController } from "react-hook-form";
// import { ProfileFormValues } from "pages/Admin/types";
// import { DrawerIcon } from "components/Icon";
// import { unsdgs } from "constants/unsdgs";

// const sdgs = Object.entries(unsdgs).map(([key, val]) => ({
//   num: key,
//   name: val.title,
// }));

// export default function SDGSelector() {
//   const {
//     field: { onChange, value },
//   } = useController<Pick<ProfileFormValues, "sdg">>({ name: "sdg" });

//   return (
//     <Listbox
//       value={value}
//       onChange={onChange}
//       as="div"
//       className="w-full focus:outline-none rounded text-sm uppercase relative bg-orange-l6 dark:bg-blue-d7 border border-gray-l2 dark:border-bluegray"
//     >
//       <Listbox.Button className="w-full p-3 text-left uppercase flex justify-between items-center">
//         {({ open }) => (
//           <>
//             {value} - {unsdgs[value].title}
//             <DrawerIcon isOpen={open} size={24} />
//           </>
//         )}
//       </Listbox.Button>
//       <Listbox.Options className="absolute bg-white shadow-2xl z-10 table p-3 rounded">
//         {sdgs.map((sdg) => (
//           <Listbox.Option key={sdg.num} value={+sdg.num} as={Fragment}>
//             {({ selected }) => (
//               <div
//                 className={`text-gray-d3 table-row hover:bg-blue-l1/30 ${
//                   selected ? "bg-amber-orange/30" : ""
//                 } cursor-pointer p-1`}
//               >
//                 <span className="table-cell pr-2 p-1">{sdg.num}</span>
//                 <span className="table-cell p-1">{sdg.name}</span>
//               </div>
//             )}
//           </Listbox.Option>
//         ))}
//       </Listbox.Options>
//     </Listbox>
//   );
// }

export {};
