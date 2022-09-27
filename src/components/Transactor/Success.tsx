import { useNavigate } from "react-router-dom";
import { SuccessStage } from "slices/transaction/types";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import SharePrompt from "components/Share";
import { useSetter } from "store/accessors";
import { setStage } from "slices/transaction/transactionSlice";
import { getTxUrl } from "helpers";

export default function Success(props: SuccessStage) {
  const { closeModal, showModal } = useModalContext();
  const navigate = useNavigate();
  const dispatch = useSetter();
  const { chain, txHash, message, isShareEnabled, successLink } = props;

  //if no special action is needed, just shown normal acknowledge button
  const isAcknowledgeButtonShown = !isShareEnabled && !successLink;

  function acknowledge() {
    dispatch(setStage({ step: "initial" }));
    closeModal();
  }

  function redirectToSuccessUrl(url: string) {
    return function () {
      navigate(url);
      dispatch(setStage({ step: "initial" }));
      closeModal();
    };
  }

  const shareDonation = () => showModal(SharePrompt, {});

  return (
    <div className="bg-white grid gap-y-4 p-4 rounded-md w-full shadow-lg min-h-[15rem] content-center place-items-center">
      <Icon type="CheckCircle" className="text-blue-d1 text-3xl mb-1" />
      <p className="text-center text-blue-d1 mb-2 font-bold">{message}</p>

      {chain && txHash && (
        <a
          href={getTxUrl(chain, txHash)}
          target="_blank"
          rel="noreferrer noopener"
          className="text-center text-blue cursor-pointer mb-6 text-sm"
        >
          view transaction details
        </a>
      )}

      <div className="flex justify-center gap-4">
        {isAcknowledgeButtonShown && <Button onClick={acknowledge}>ok</Button>}
        {isShareEnabled && (
          <Button onClick={shareDonation} _bg="bg-orange">
            share
          </Button>
        )}

        {successLink && (
          <Button
            onClick={redirectToSuccessUrl(successLink.url)}
            _bg="bg-orange"
          >
            {successLink.description}
          </Button>
        )}
      </div>
    </div>
  );
}

function Button({
  _bg = "bg-blue",
  ...restProps
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { _bg?: string }) {
  return (
    <button
      {...restProps}
      className={`${_bg} text-white rounded-md uppercase py-1 px-4 font-bold`}
    />
  );
}
