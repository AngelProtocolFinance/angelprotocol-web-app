import { PropsWithChildren, useCallback } from "react";
import { Link } from "react-router-dom";
import { useModalContext } from "contexts/ModalContext";
import { WithWallet } from "contexts/WalletContext";
import { useSetter } from "store/accessors";
import { SubmitStep, setStep } from "slices/donation";
import { humanize } from "helpers";
import { appRoutes } from "constants/routes";
import FiatKadoModal from "./FiatKadoModal";
import getBreakdown from "./getBreakdown";

export default function FiatSubmit(props: WithWallet<SubmitStep>) {
  const dispatch = useSetter();

  function goBack() {
    dispatch(setStep(props.step - 1));
  }

  const { token } = props.details;
  const { id: endowId } = props.recipient;
  const { fromBal, fromGift } = getBreakdown(token);

  const { showModal } = useModalContext();

  const handleOpenKado = useCallback(
    () => showModal(FiatKadoModal, props),
    [props, showModal]
  );

  return (
    <div className="grid content-start">
      <Row title="Currency:">
        <img
          alt=""
          className="ml-auto object-cover h-4 w-4 rounded-full mr-1"
          src={token.logo}
        />
        <span>{token.symbol}</span>
      </Row>
      <Row title="Amount:">
        <span>
          {token.symbol} {humanize(fromBal, 4)}
        </span>
      </Row>
      {fromGift ? (
        <Row title="Giftcard:">
          {token.symbol} {humanize(fromGift, 4)}
        </Row>
      ) : null}
      <div className="mt-14 grid grid-cols-2 gap-5">
        <button
          className="btn-outline-filled btn-donate"
          onClick={goBack}
          type="button"
        >
          Back
        </button>
        <button
          className="btn-orange btn-donate"
          onClick={() => handleOpenKado()}
          type="submit"
        >
          Complete
        </button>
        <Link
          to={appRoutes.profile + `/${endowId}`}
          className="col-span-full btn-outline btn-donate"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}

function Row({
  title,
  children,
  classes = "",
}: PropsWithChildren<{ classes?: string; title: string }>) {
  return (
    <div
      className={`${classes} py-3 text-gray-d1 dark:text-gray flex items-center justify-between w-full border-b border-prim last:border-none`}
    >
      <p className="text-gray-d2 dark:text-white">{title}</p>
      {children}
    </div>
  );
}
