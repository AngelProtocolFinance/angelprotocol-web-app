import { steps } from "pages/Registration/routes";
import { WalletState, useSetWallet } from "contexts/WalletContext";
import { BtnPrim, BtnSec, Separator } from "components/registration";
import { useRegState } from "../StepGuard";
import useRegisterWallet from "./useRegisterWallet";

export type Wallet = { address: string };

export default function WalletSubmission({
  address,
  providerId,
  walletIcon,
}: WalletState) {
  const { disconnect } = useSetWallet();
  const { isSubmitting, registerWallet } = useRegisterWallet();
  const { data } = useRegState<3>();

  if (providerId !== "keplr") {
    return (
      <div className="text-center bg-orange/20 border-2 border-orange/80 rounded-md p-4 ">
        <p>
          <span className="text-sm font-bold">connected wallet: </span>
          <span className="font-extrabold uppercase">
            {providerId.toLocaleUpperCase()}
          </span>
        </p>
        <p>Only Keplr wallet is allowed!</p>
        <BtnPrim
          className="text-sm uppercase text-orange hover:text-orange px-2 py-1 mt-2"
          disabled={isSubmitting}
          onClick={disconnect}
        >
          Connect Keplr wallet
        </BtnPrim>
      </div>
    );
  }

  return (
    <div className="grid max-w-[27.31rem]">
      <h3 className="text-lg font-bold">
        You are already connected to a Wallet:
      </h3>
      <div className="grid grid-cols-[auto_1fr] items-center border border-gray-l2 dark:border-bluegray p-4 rounded mt-8">
        <img
          src={walletIcon}
          alt=""
          className="w-10 h-10 object-contain row-span-2 mr-4"
        />
        <h6 className="capitalize font-bold text-lg mb-1">{providerId}</h6>
        <span className="text-sm">{address}</span>
      </div>

      <Separator classes="my-8 before:mr-2 after:ml-2">OR</Separator>

      <BtnSec
        className="text-sm my-2"
        disabled={isSubmitting}
        onClick={disconnect}
      >
        Connect new wallet
      </BtnSec>
      <p className="text-center text-sm">We recommend using a new wallet.</p>

      <div className="flex mt-8 gap-2">
        <BtnSec
          as="link"
          to={`../${steps.doc}`}
          state={data.init}
          aria-disabled={isSubmitting}
          className="min-w-[8rem]"
        >
          Back
        </BtnSec>
        <BtnPrim
          disabled={isSubmitting}
          className="min-w-[8rem]"
          onClick={() => {
            registerWallet(address);
          }}
        >
          Continue
        </BtnPrim>
      </div>
    </div>
  );
}
