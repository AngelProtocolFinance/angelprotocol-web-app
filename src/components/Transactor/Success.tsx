import { useNavigate } from "react-router-dom";
import { SuccessStage } from "slices/transaction/types";
import { useModalContext } from "contexts/ModalContext";
import ExtLink from "components/ExtLink";
import Prompt from "components/Prompt";
import { useSetter } from "store/accessors";
import { setStage } from "slices/transaction/transaction";
import { getTxUrl } from "helpers";

export default function Success(props: SuccessStage) {
  const { closeModal } = useModalContext();
  const navigate = useNavigate();
  const dispatch = useSetter();
  const { tx, successLink } = props;

  function redirect(url: string) {
    navigate(url);
    dispatch(setStage({ step: "initial" }));
    closeModal();
  }

  return (
    <Prompt
      headline="Transaction"
      title="Success!"
      type="success"
      inModal={false}
    >
      <p className="text-center mb-2 ">{props.message}</p>
      {tx && (
        <ExtLink
          href={getTxUrl(tx.chainID, tx.hash)}
          className="text-center text-blue cursor-pointer mb-6 text-sm"
        >
          view transaction details
        </ExtLink>
      )}

      {successLink && (
        <button
          onClick={() => redirect(successLink.url)}
          type="button"
          className={`text-white rounded-md uppercase py-1 px-4 font-bold`}
        >
          {successLink.description}
        </button>
      )}
    </Prompt>
  );
}
