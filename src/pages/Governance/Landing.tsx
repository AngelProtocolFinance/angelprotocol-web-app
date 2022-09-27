import { symbols } from "constants/currency";
import Figure from "./Figure";
import Polls from "./Polls/Polls";
import Portal from "./Portal";
import useGov from "./useGov";

// import { useNavigate } from "react-router-dom";
// import { app, site } from "constants/routes";

export default function Landing() {
  const { staked, percentStaked, spot_price } = useGov();

  return (
    <div className="padded-container grid grid-rows-[auto_auto_1fr] gap-4 pb-4 min-h-screen">
      <h2 className="font-heading uppercase font-bold text-4xl mt-4 text-white">
        Governance
      </h2>
      <div className="flex flex-wrap lg:grid lg:grid-cols-[auto_1fr] xl:grid-cols-2 xl:grid-rows-2 gap-3">
        <Figure
          title="halo price"
          value={spot_price}
          symbol={symbols.axlusdc}
          precision={6}
        />
        <Figure
          position="lg:row-start-2"
          title="total staked"
          value={staked}
          symbol={symbols.axlusdc}
          percent={percentStaked}
        />
        <Portal />
        {/* <DonationAdvert /> */}
      </div>
      <Polls />
    </div>
  );
}

// function DonationAdvert() {
//   const navigate = useNavigate();
//   return (
//     <div className="mt-5 w-full col-span-2 border-white/10 bg-white/10 rounded-md p-3 text-white shadow-xl cursor-pointer">
//       <h4 className="text-white text-center font-normal text-lg mb-5 overflow-hidden p-3 pl-10 pr-10">
//         The charity marketplace is now open!
//         <br />
//         Give directly to the endowment of your choice and 10% of your donation
//         will be matched with $HALO tokens shared between you and the charity.
//       </h4>
//       <div className="w-full flex justify-center">
//         <button
//           onClick={() => navigate(`${site.app}/${app.marketplace}`)}
//           className="w-[20rem] px-10 py-3 font-heading text-sm text-white bg-blue-accent hover:bg-angel-blue border-2 border-white/30 shadow-sm w-32 uppercase text-center mb-1 lg:mb-0 rounded-md"
//         >
//           Donate now
//         </button>
//       </div>
//     </div>
//   );
// }
