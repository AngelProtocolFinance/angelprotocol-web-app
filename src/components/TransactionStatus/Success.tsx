import { useNavigate } from "react-router-dom";
import { SuccessStage } from "slices/transaction/types";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import SharePrompt from "components/Share";
import { useSetter } from "store/accessors";
import { setStage } from "slices/transaction/transactionSlice";
import getTxUrl from "helpers/getTxUrl";

export default function Success(props: SuccessStage) {
  if (props.step !== "success") throw new Error("wrong component rendered");
  const { closeModal, showModal } = useModalContext();
  const navigate = useNavigate();
  const dispatch = useSetter();
  const {
    chainId,
    txHash,
    message,
    isReceiptEnabled,
    isShareEnabled,
    successLink,
  } = props;

  //if no special action is needed, just shown normal acknowledge button
  const isAcknowledgeButtonShown =
    !isReceiptEnabled && !isShareEnabled && !successLink;

  function acknowledge() {
    dispatch(setStage({ step: "form" }));
    closeModal();
  }

  function showReceiptForm() {
    dispatch(setStage({ step: "receipt", chainId, txHash }));
  }

  function redirectToSuccessUrl(url: string) {
    return function () {
      navigate(url);
      dispatch(setStage({ step: "form" }));
      closeModal();
    };
  }

  const shareDonation = () => showModal(SharePrompt, {});

  return (
    <div className="bg-white-grey grid gap-y-4 p-4 rounded-md w-full shadow-lg min-h-115 content-center place-items-center">
      <Icon type="CheckCircle" className="text-blue-accent text-3xl mb-1" />
      <p className="text-center text-blue-accent mb-2 font-bold">{message}</p>

      {chainId && txHash && (
        <a
          href={getTxUrl(chainId, txHash)}
          target="_blank"
          rel="noreferrer noopener"
          className="text-center text-angel-blue cursor-pointer mb-6 text-sm"
        >
          view transaction details
        </a>
      )}

      <div className="flex justify-center gap-4">
        {isAcknowledgeButtonShown && <Button onClick={acknowledge}>ok</Button>}
        {isReceiptEnabled && (
          <Button onClick={showReceiptForm}>get receipt</Button>
        )}

        {isShareEnabled && (
          <Button onClick={shareDonation} _bg="bg-angel-orange">
            share
          </Button>
        )}

        {successLink && (
          <Button
            onClick={redirectToSuccessUrl(successLink.url)}
            _bg="bg-angel-orange"
          >
            {successLink.description}
          </Button>
        )}
      </div>
    </div>
  );
}

function Button({
  _bg = "bg-angel-blue",
  ...restProps
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { _bg?: string }) {
  return (
    <button
      {...restProps}
      className={`${_bg} text-white rounded-md uppercase py-1 px-4 font-bold`}
    />
  );
}
