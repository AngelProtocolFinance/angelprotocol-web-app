import { FundDestroyValues as FD } from "pages/Admin/types";
import Label from "pages/Admin/common/Label";
import { FormContainer } from "pages/Admin/common/TemplateContainer";
import Submitter from "../../../common/Submitter";
import TextInput from "../../../common/TextInput";
import FundSelection from "../../FundSelection";
import useDestroyFund from "./useDestroyFund";

export default function FundDestroyerForm() {
  const { destroyFund, isSubmitDisabled } = useDestroyFund();
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
        Submit Proposal
      </Submitter>
    </FormContainer>
  );
}
