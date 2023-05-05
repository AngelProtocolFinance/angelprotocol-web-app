import { Link } from "react-router-dom";
import { WalletState, useSetWallet } from "contexts/WalletContext";
import Image from "components/Image";
import { Separator } from "components/registration";
import { useLaunchpad } from "slices/launchpad";
import { steps } from "../constants";

export type Wallet = { address: string };

export default function WalletSubmission({
  address,
  providerId,
  walletIcon,
}: WalletState) {
  const { disconnect } = useSetWallet();

  const { update } = useLaunchpad(7);

  return (
    <div className="grid justify-self-center md:justify-self-start max-w-[27.31rem]">
      <h3 className="text-center md:text-left text-lg">
        You are already connected to a Wallet:
      </h3>
      <div className="grid grid-cols-[auto_1fr] items-center border border-prim p-4 rounded mt-8">
        <Image src={walletIcon} className="w-10 h-10 row-span-2 mr-4" />
        <h6 className="capitalize text-lg mb-1">{providerId}</h6>
        <span className="text-sm truncate">{address}</span>
      </div>

      <Separator classes="my-8 before:mr-2 after:ml-2">OR</Separator>

      <button
        type="button"
        className="my-2 btn-outline-filled btn-reg"
        onClick={disconnect}
      >
        Connect new wallet
      </button>
      <div className="grid grid-cols-2 md:flex gap-3 items-center mt-8">
        <Link
          to={`../${steps[6].path}`}
          className="min-w-[8rem] btn-outline-filled btn-reg"
        >
          Back
        </Link>
        <button
          type="button"
          onClick={() => update(null)}
          className="min-w-[8rem] btn-orange btn-reg"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
