import { UseFormRegisterReturn } from "react-hook-form";
import { Link } from "react-router-dom";
import { site, web } from "types/routes";

type Props = {
  error?: string;
  registerReturn: UseFormRegisterReturn;
};

export default function PrivacyPolicyCheckbox(props: Props) {
  const { error, registerReturn } = props;

  return (
    <div className="mb-4 mt-10 text-center">
      <input
        id={registerReturn.name}
        type="checkbox"
        className="mr-2 cursor-pointer"
        {...registerReturn}
      />
      <label htmlFor={registerReturn.name} className="cursor-pointer">
        By checking this box, you declare that you have read and agreed to our{" "}
        <Link
          to={`${site.home}${web.privacy}`}
          target="_blank"
          rel="noreferrer noopener"
          className="underline text-angel-blue"
        >
          Privacy Policy
        </Link>
        <span className="text-failed-red ml-0.5">*</span>
      </label>
      {error && <p className="text-sm text-failed-red">{error}</p>}
    </div>
  );
}
