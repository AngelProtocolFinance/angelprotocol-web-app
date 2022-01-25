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
    <div className="grid grid-cols-1 items-center justify-center mb-4 mt-10">
      <div className="mx-auto">
        <div className="mr-5 items-center pt-2 text-center justify-center">
          <input
            id={registerReturn.name}
            type="checkbox"
            {...registerReturn}
            className="mr-2 cursor-pointer"
          />
          <label htmlFor={registerReturn.name} className="cursor-pointer">
            By checking this box, you declare that you have read and agreed to
            our{" "}
            <Link
              to={`${site.home}${web.privacy}`}
              target="_blank"
              rel="noreferrer noopener"
              className="underline text-angel-blue"
            >
              Privacy Policy
            </Link>
            <span className="text-failed-red">*</span>
          </label>
        </div>
        {error && (
          <p className="text-sm text-failed-red text-center">{error}</p>
        )}
      </div>
    </div>
  );
}
