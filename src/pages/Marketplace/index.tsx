// import banner from "assets/images/hands-blue.jpg";
// import { useGetter } from "store/accessors";
// import Cards from "./Cards";
// import Hero from "./Hero";
// import Sidebar from "./Sidebar";
// import Toolbar from "./Toolbar";
import {
  SimulContractTx,
  SimulSendNativeTx,
  transfer,
} from "services/apes/helpers/test";
import {
  ContextState,
  isConnected,
  useWalletContext,
} from "contexts/WalletContext";
import { getProvider, scale } from "helpers";
import { ap_wallets } from "constants/ap_wallets";

// export default function Marketplace() {
//   const isFilterOpen = useGetter(
//     (state) => state.component.marketFilter.isOpen
//   );
//   return (
//     <div className="w-full grid content-start pb-16">
//       <div
//         style={{ backgroundImage: `url('${banner}')` }}
//         className="relative overlay bg-cover bg-center"
//       >
//         <Hero classes="grid isolate mt-28 mb-16" />
//       </div>

//       <div className="grid grid-cols-[auto_1fr] gap-x-8 grid-rows-[auto_1fr] padded-container min-h-screen">
//         <Toolbar classes="my-10 col-span-2" />
//         <Sidebar
//           classes={`${
//             isFilterOpen
//               ? "fixed z-20 inset-0 md:grid md:relative md:z-0"
//               : "hidden"
//           }`}
//         />
//         <Cards
//           classes={`${
//             isFilterOpen ? "col-span-2 md:col-span-1" : "col-span-2"
//           }`}
//         />
//       </div>
//     </div>
//   );
// }

async function estimate(wallet: ContextState) {
  if (
    isConnected(wallet) &&
    (wallet.type == "evm" || wallet.type === "evm-wc")
  ) {
    const provider = getProvider(wallet.id)!;

    // const tx: SimulContractTx = {
    //   from: wallet.address,
    //   to: "0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60",
    //   data: transfer.encode(ap_wallets.eth, scale("0.001", 18).toHex()),
    // };

    const tx: SimulSendNativeTx = {
      to: ap_wallets.eth,
      from: wallet.address,
      value: scale("0.001", 18).toHex(),
    };

    // console.log(tx, scale("0.001", 18);

    const [nonce, gas, gasPrice] = await Promise.all([
      provider.request<string>({
        method: "eth_getTransactionCount",
        params: [wallet.address, "latest"],
      }),

      //for display in summary only but not
      provider.request({ method: "eth_estimateGas", params: [tx] }),
      provider.request<string>({
        method: "eth_gasPrice",
      }),
    ]);

    console.log(gas, gasPrice);

    const hash = await provider.request({
      method: "eth_sendTransaction",
      params: [{ ...tx, nonce }],
    });

    console.log(hash);
  } else {
    alert("connect correct wallet");
  }
}
export default function Hello() {
  const wallet = useWalletContext();
  return <button onClick={() => estimate(wallet)}>hello</button>;
}
