import { FormContainer, Submitter } from "@ap/components/admin";
import { Field, Label } from "@ap/components/form";
import { FundDestroyValues as FD } from "@/pages/Admin/types";
import FundSelection from "../FundSelection";
import useDestroyFund from "./useDestroyFund";

export default function Form() {
  const { destroyFund, isSubmitDisabled } = useDestroyFund();
  return (
    <FormContainer onSubmit={destroyFund}>
      <Field<FD>
        classes="field-admin"
        label="Proposal title"
        name="title"
        required
      />
      <Field<FD, "textarea">
        type="textarea"
        classes="field-admin"
        label="Proposal description"
        name="description"
        required
      />
      <Label required className="-mb-4">
        Fund to remove
      </Label>
      <FundSelection<FD> fieldName="fundId" />
      <Submitter type="submit" _classes="mt-4" disabled={isSubmitDisabled}>
        Submit
      </Submitter>
    </FormContainer>
  );
}
