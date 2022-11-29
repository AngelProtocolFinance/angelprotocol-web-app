import { CW3ConfigValues, FormCW3Config } from "../../../types";
import Checkbox from "components/Checkbox";
import { FormContainer, Submitter, TextArea, TextPrim } from "components/admin";
import usePropose from "./usePropose";

type CV = CW3ConfigValues<FormCW3Config>;

export default function Form() {
  const { configureCW3, isSubmitDisabled, isTime } = usePropose();
  return (
    <FormContainer onSubmit={configureCW3}>
      <TextPrim<CV> label="Proposal title" name="title" required />
      <TextArea<CV> label="Proposal description" name="description" required />
      <TextPrim<CV> label="Pass threshold ( % )" name="threshold" required />
      <TextPrim<CV>
        label={`Voting period (${isTime ? "seconds" : "blocks"})`}
        name="duration"
        required
      />
      <Checkbox<CV>
        name="require_execution"
        classes={{
          container:
            "p-3 text-sm rounded bg-orange-l6 dark:bg-blue-d7 grid items-center border border-gray-l2 dark:border-bluegray",
        }}
      >
        Execution required
      </Checkbox>

      <Submitter type="submit" disabled={isSubmitDisabled}>
        Submit
      </Submitter>
    </FormContainer>
  );
}
