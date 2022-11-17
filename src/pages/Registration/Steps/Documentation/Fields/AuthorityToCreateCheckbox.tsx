import { useRegState } from "services/aws/registration/StepGuard";
import Checkbox from "components/Checkbox";

export default function AuthorityToCreateCheckbox() {
  const {
    data: { contact },
  } = useRegState<2>();
  return (
    <Checkbox name="hasAuthority">
      {`By checking this box, you declare that you have the authority to create an
        endowment in the name of ${contact.orgName} through Angel Protocol`}
      <span className="text-red-l1 ml-0.5">*</span>
    </Checkbox>
  );
}
