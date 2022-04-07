import { FormContainer } from "pages/Admin/components/TemplateContainer";
import TextInput from "pages/Admin/components/TextInput";
import Submitter from "../Submitter";
import { RegistrarConfigValues as RV } from "./registrarConfigSchema";

export default function RegistrarConfigForm() {
  return (
    <FormContainer onSubmit={() => {}}>
      <TextInput<RV> title="Proposal Title" name="title" required />
      <TextInput<RV>
        title="proposal description"
        name="description"
        wide
        required
      />
      <Submitter type="submit" _classes="mt-4">
        Submit Proposal
      </Submitter>
    </FormContainer>
  );
}
