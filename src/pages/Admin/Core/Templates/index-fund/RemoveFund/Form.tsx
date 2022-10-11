import { FundDestroyValues as FD } from "pages/Admin/types";
import { FormContainer, Label, Submitter, TextInput } from "components/admin";
import FundSelection from "../FundSelection";
import useDestroyFund from "./useDestroyFund";

export default function Form() {
  const { destroyFund, isSubmitDisabled, cw3MemberCount } = useDestroyFund();
  return (
    <FormContainer onSubmit={destroyFund}>
      <TextInput<FD> title="Proposal Title" name="title" required />
      <TextInput<FD>
        title="proposal description"
        name="description"
        wide
        required
      />
      <Label _required>Fund to remove</Label>
      <FundSelection<FD> fieldName="fundId" />
      <Submitter type="submit" _classes="mt-4" disabled={isSubmitDisabled}>
        Submit{cw3MemberCount > 1 ? "proposal" : ""}
      </Submitter>
    </FormContainer>
  );
}
