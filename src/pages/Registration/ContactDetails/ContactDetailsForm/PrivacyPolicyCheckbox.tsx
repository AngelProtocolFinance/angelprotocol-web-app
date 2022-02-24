import { Link } from "react-router-dom";
import { site, web } from "constants/routes";
import { ForwardedRef, forwardRef } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

const PrivacyPolicyCheckbox = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const { error, ...rest } = props;

    return (
      <div>
        <input
          id={rest.name}
          ref={ref}
          type="checkbox"
          className="mr-2 cursor-pointer"
          {...rest}
        />
        <label htmlFor={rest.name} className="cursor-pointer">
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
);

export default PrivacyPolicyCheckbox;
