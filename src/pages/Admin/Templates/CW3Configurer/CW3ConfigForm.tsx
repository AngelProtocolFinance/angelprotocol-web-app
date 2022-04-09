import { FormContainer } from "pages/Admin/components/TemplateContainer";
import TextInput from "../../components/TextInput";
import Submitter from "../Submitter";
import { CW3ConfigValues as CV } from "./cw3ConfigSchema";
import useConfigureCW3 from "./useConfigureCW3";

export default function CW3ConfigForm() {
  const { configureCW3, isSubmitDisabled } = useConfigureCW3();
  return (
    <FormContainer onSubmit={configureCW3}>
      <TextInput<CV> title="Proposal Title" name="title" required />
      <TextInput<CV>
        title="proposal description"
        name="description"
        wide
        required
      />
      <TextInput<CV>
        title="pass threshold ( % )"
        name="threshold"
        required
        mono
      />
      <TextInput<CV>
        title="voting period (blocks)"
        name="height"
        required
        mono
      />
      <Submitter type="submit" _classes="mt-4" disabled={isSubmitDisabled}>
        Submit Proposal
      </Submitter>
    </FormContainer>
  );
}
