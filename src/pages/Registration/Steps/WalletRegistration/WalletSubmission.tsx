import { steps } from "pages/Registration/routes";
import { ConnectedWallet } from "contexts/WalletContext";
import Icon from "components/Icon";
import { BtnPrim, BtnSec, LoadText, Separator } from "components/registration";
import { useRegState } from "../StepGuard";
import useRegisterWallet from "./useRegisterWallet";

export default function WalletSubmission({
  address,
  id,
  name,
  logo,
  disconnect,
}: ConnectedWallet) {
  const { isSubmitting, registerWallet } = useRegisterWallet();
  const { data } = useRegState<3>();

  if (id !== "keplr") {
    return (
      <div className="text-center md:text-left">
        <h3 className="text-lg font-bold mb-4 flex items-center justify-center md:justify-start gap-3">
          <Icon type="Info" className="text-red" size={28} />
          <span>Unsupported wallet</span>
        </h3>
        <p className="text-gray-d1 dark:text-gray text-sm">
          connected wallet{" "}
          <span className="font-semibold capitalize">{id}</span> is not
          supported for registration.
        </p>

        <BtnSec className="mt-8" disabled={isSubmitting} onClick={disconnect}>
          Change wallet
        </BtnSec>
      </div>
    );
  }

  return (
    <div className="grid justify-self-center md:justify-self-start max-w-[27.31rem]">
      <h3 className="text-center md:text-left text-lg font-bold">
        You are already connected to a Wallet:
      </h3>
      <div className="grid grid-cols-[auto_1fr] items-center border border-gray-l2 dark:border-bluegray p-4 rounded mt-8">
        <img
          src={logo}
          alt=""
          className="w-10 h-10 object-contain row-span-2 mr-4"
        />
        <h6 className="capitalize font-bold text-lg mb-1">{name}</h6>
        <span className="text-sm truncate">{address}</span>
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

      <div className="grid grid-cols-2 md:flex mt-8 gap-2">
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
          <LoadText isLoading={isSubmitting}>Continue</LoadText>
        </BtnPrim>
      </div>
    </div>
  );
}
