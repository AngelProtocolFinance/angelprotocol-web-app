import Action from "components/ActionButton/Action";
import { FaExclamation } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

type Props = {
  onClick: () => void;
  isLoading: boolean;
};

export default function LinkExpired({ onClick, isLoading }: Props) {
  return (
    <div>
      <div className="flex justify-center rounded-xl mb-5">
        <FaExclamation className="text-4xl text-red-500" />
      </div>
      <div className="my-10">
        <span className="text-2xl font-bold">
          Your verification link has expired. Please resend the verification
          email.
        </span>
      </div>
      <div className="mb-2">
        <Action
          classes="bg-thin-blue w-48 h-12"
          onClick={onClick}
          title="resend"
          disabled={isLoading}
        />
      </div>
      <ToastContainer />
    </div>
  );
}
