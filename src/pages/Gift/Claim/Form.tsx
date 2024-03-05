import { ErrorMessage } from "@hookform/error-message";
import Icon from "components/Icon";
import Prompt from "components/Prompt";
import { APP_NAME } from "constants/env";
import { appRoutes } from "constants/routes";
import { APIs } from "constants/urls";
import { useModalContext } from "contexts/ModalContext";
import { isConnected, useWalletContext } from "contexts/WalletContext";
import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import { ConnectedWallet } from "types/wallet";
import { FormValues as FV } from "./types";

export default function Form({ classes = "" }) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useFormContext<FV>();
  const { showModal } = useModalContext();

  const walletState = useWalletContext();

  async function submit(data: FV) {
    /** restricted by submit button */
    const wallet = walletState as ConnectedWallet;
    const res = await fetch(APIs.aws + "/v1/giftcard/claim", {
      method: "POST",
      body: JSON.stringify({
        secret: data.secret,
        recipient: wallet.address,
        chain: wallet.chainId,
      }),
    });
    if (!res.ok) {
      return showModal(Prompt, {
        type: "error",
        headline: "Claim",
        title: "Failed to claim gift card",
      });
    }
    showModal(Prompt, {
      type: "success",
      headline: "Redeem",
      title: "Giftcard Redeemed Successfully",
      children: `Giftcard balance has been credited to your account and you can start donating!`,
    });
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`justify-self-center grid padded-container w-full max-w-[32rem] gap-8 ${classes}`}
      autoComplete="off"
    >
      <Icon
        type="Giftcard"
        className="bg-green text-white p-5 rounded-full justify-self-center"
        size={96}
      />
      <h3 className="text-center text-3xl leading-snug">
        {`Redeem ${APP_NAME} Giftcard`}
      </h3>
      <div className="relative grid w-full border border-gray-l4 rounded-lg overflow-clip">
        <p className="text-xs text-center uppercase text-gray-d1 dark:text-gray p-4 border-b border-gray-l4">
          Type your giftcard code here:
        </p>
        <textarea
          disabled={isSubmitting}
          spellCheck={false}
          autoComplete="off"
          style={{ resize: "none" }}
          placeholder="e.g. ap-uni-6-821438429620466130011364269412975309697"
          {...register("secret")}
          className="text-lg bg-orange-l6 dark:bg-blue-d6 disabled:bg-gray-l5 disabled:dark:bg-navy-d3 focus:outline-none text-center p-6 pb-4 break-all overflow-hidden"
        />
        <ErrorMessage
          name="secret"
          as="p"
          className="text-xs text-red dark:text-red-l2 absolute bottom-2 right-2"
        />
      </div>
      <button
        type="submit"
        className="sm:mx-32 btn-outline-filled btn-gift"
        disabled={isSubmitting || !isConnected(walletState)}
      >
        {isSubmitting
          ? "Redeeming..."
          : !isConnected(walletState)
            ? "Connect wallet to redeem"
            : "Redeem your giftcard"}
      </button>
      <Link
        aria-disabled={isSubmitting}
        to={appRoutes.marketplace}
        className="sm:mx-32 btn-orange btn-gift -mt-3 sm:mt-4"
      >
        Back to the platform
      </Link>
    </form>
  );
}
