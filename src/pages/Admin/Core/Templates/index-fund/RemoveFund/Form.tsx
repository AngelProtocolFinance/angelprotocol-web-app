import { FormValues as FV } from "./types";
import { Field } from "components/form";
import { FormContainer, Submitter } from "../../../../components";
import useDestroyFund from "./useDestroyFund";

export default function Form() {
  const { destroyFund, isSubmitDisabled } = useDestroyFund();
  return (
    <FormContainer onSubmit={destroyFund}>
      <Field<FV>
        classes="field-admin"
        label="Proposal title"
        name="title"
        required
      />
      <Field<FV, "textarea">
        type="textarea"
        classes="field-admin"
        label="Proposal description"
        name="description"
        required
      />
      <Field<FV> classes="field-admin" label="Fund ID" name="fundId" required />
      <Submitter type="submit" _classes="mt-4" disabled={isSubmitDisabled}>
        Submit
      </Submitter>
    </FormContainer>
  );
}
