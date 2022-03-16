import { Route, Routes } from "react-router-dom";
import { charity } from "constants/routes";
import { EndowmentInfo } from "./EndowmentInfo";
import Overview from "./Overview";

export default function InfoTabs() {
  return (
    <Routes>
      <Route path={`${charity.overview}`} element={<Overview />} />
      <Route path={`${charity.endowment}`} element={<EndowmentInfo />} />
      <Route path={`${charity.programs}`} element={<Overview />} />
      <Route path={`${charity.media}`} element={<Overview />} />
      <Route path={`${charity.governance}`} element={<Overview />} />
      <Route path="*" element={<Overview />} />
    </Routes>
  );
}

// function AccountAction() {
//   return (
//     <div className="flex flex-col items-start lg:justify-end gap-2 w-115 min-h-r15">
//       <div>
//         <button className="capitalize bg-green-400 text-white font-semibold rounded-xl md:w-48 w-52 h-12 d-flex justify-center items-center">
//           Withdraw (current)
//         </button>
//       </div>
//       <div>
//         <button className="capitalize bg-gray-300 text-white font-semibold rounded-xl md:w-48 w-52 h-12 d-flex justify-center items-center">
//           Change (Strategy)
//         </button>
//       </div>
//     </div>
//   );
// }

//TODO: remove this component declaration inside component
// function CharityPrograms() {
//   function ProgramItem() {
//     return (
//       <div className="flex justify-between gap-5 w-full h-40 font-heading">
//         <div className="w-128 h-full bg-blue-200"></div>
//         <div className="w-full flex-grow h-full text-white">
//           <p className="uppercase text-2xl font-medium tracking-wide m-0">
//             Program name
//           </p>
//           <span className="text-xs inline-block">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
//             perspiciatis alias facilis dolorem! Eum non temporibus porro itaque
//             aliquam beatae laudantium quaerat ex dolor atque. Porro non id vel
//             aliquam. Lorem ipsum dolor sit amet consectetur adipisicing elit.
//             Sequi perspiciatis alias facilis dolorem! Eum non temporibus porro
//             itaque aliquam beatae laudantium quaerat ex dolor atque. Porro non
//             id vel aliquam. Lorem ipsum dolor sit amet consectetur adipisicing
//             elit. Sequi perspiciatis alias facilis dolorem! Eum non temporibus
//             porro itaque aliquam beatae laudantium quaerat ex dolor atque. Porro
//             non id vel aliquam.
//           </span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-2 w-full lg:min-h-1/2 lg:mt-5 text-left pb-10">
//       <ProgramItem></ProgramItem>
//       <ProgramItem></ProgramItem>
//       <ProgramItem></ProgramItem>
//     </div>
//   );
// }
