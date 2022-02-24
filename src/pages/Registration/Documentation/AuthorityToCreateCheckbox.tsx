import Checkbox, { CheckboxProps } from "components/Checkbox";
import { ForwardedRef, forwardRef } from "react";

type Props = CheckboxProps & { charityName: string };

const AuthorityToCreateCheckbox = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const { charityName, ...rest } = props;

    return (
      <Checkbox {...rest} ref={ref}>
        {`By checking this box, you declare that you have the authority to create an
        endowment in the name of ${charityName} through Angel Protocol`}
        <span className="text-failed-red ml-0.5">*</span>
      </Checkbox>
    );
  }
);

export default AuthorityToCreateCheckbox;
