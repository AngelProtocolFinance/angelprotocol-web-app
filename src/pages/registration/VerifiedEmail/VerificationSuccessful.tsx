import Action from "components/ActionButton/Action";
import { FaCheck } from "react-icons/fa";

type Props = {
  responseData: any;
  onClick: () => void;
  isLoading: boolean;
};

export default function VerificationSuccessfulContent(props: Props) {
  const { responseData, onClick, isLoading } = props;

  return (
    <div>
      <div className="flex justify-center rounded-xl mb-5">
        <FaCheck className="text-4xl text-yellow-blue" />
      </div>
      <div>
        <p className="text-2xl font-bold">Thank you for registering.</p>
        <p className="text-2xl font-bold mb-10">
          {responseData.CharityName}, {responseData.FirstName}!
        </p>
        <p className="text-2xl font-bold">Your registration reference is </p>
        <p className="text-2xl font-bold text-yellow-600">{responseData.PK}</p>
      </div>

      <div className="my-10">
        <span className="text-base">
          We have sent it to your email address for your future reference.
        </span>
      </div>
      <div className="mb-2">
        <Action
          classes="bg-thin-blue w-48 h-12"
          onClick={onClick}
          title="Continue"
          disabled={isLoading}
        />
      </div>
    </div>
  );
}
