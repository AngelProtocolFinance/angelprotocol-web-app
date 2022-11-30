import { CW3ConfigValues as CV } from "pages/Admin/types";
import Checkbox from "components/Checkbox";
import { FormContainer, Submitter, TextArea, TextPrim } from "components/admin";
import usePropose from "./usePropose";

export default function Form() {
  const { configureCW3, isSubmitDisabled, isTime } = usePropose();
  return (
    <FormContainer onSubmit={configureCW3}>
      <TextPrim<CV> label="Proposal Title" name="title" required />
      <TextArea<CV> label="Proposal description" name="description" required />
      <TextPrim<CV> label="Pass threshold ( % )" name="threshold" required />
      <TextPrim<CV>
        label={`Voting period (${isTime ? "seconds" : "blocks"})`}
        name="duration"
        required
      />
      <Checkbox<CV>
        name="require_execution"
        classes={{ label: "text-sm -ml-1" }}
      >
        Execution required
      </Checkbox>

      <Submitter type="submit" disabled={isSubmitDisabled}>
        Submit
      </Submitter>
    </FormContainer>
  );
}
