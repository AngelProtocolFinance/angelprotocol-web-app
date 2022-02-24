import Checkbox, { CheckboxProps } from "components/Checkbox";
import { site, web } from "constants/routes";
import { ForwardedRef, forwardRef } from "react";
import { Link } from "react-router-dom";

const PrivacyPolicyCheckbox = forwardRef(
  (props: CheckboxProps, ref: ForwardedRef<HTMLInputElement>) => (
    <Checkbox {...props} ref={ref}>
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
    </Checkbox>
  )
);

export default PrivacyPolicyCheckbox;
