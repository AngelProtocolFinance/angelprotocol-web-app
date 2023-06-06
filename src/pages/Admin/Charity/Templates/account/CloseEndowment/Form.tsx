import { FormValues as FV } from "./types";
import { Field } from "components/form";
import { FormContainer, Submitter } from "../../../../components";
import Beneficiary from "./Beneficiary";
import useCloseEndowment from "./useCloseEndowment";

export default function Form() {
  const { closeEndowment } = useCloseEndowment();
  return (
    <FormContainer onSubmit={closeEndowment}>
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
      <Beneficiary />
      <Submitter type="submit" _classes="mt-4">
        Submit
      </Submitter>
    </FormContainer>
  );
}
//
