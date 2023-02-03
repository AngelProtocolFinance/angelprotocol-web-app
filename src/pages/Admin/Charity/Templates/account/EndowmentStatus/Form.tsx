import { EndowmentUpdateValues as V } from "pages/Admin/types";
import { FormContainer, Submitter } from "components/admin";
import { Field, Label } from "components/form";
import StatusOptions from "./StatusOptions";
import StatusPreview from "./StatusPreview";
import useUpdateStatus from "./useUpdateStatus";

export default function Form() {
  const { updateStatus } = useUpdateStatus();
  return (
    <FormContainer onSubmit={updateStatus}>
      <Field<V>
        classes="field-admin"
        label="Proposal title"
        name="title"
        required
      />
      <Field<V, "textarea">
        type="textarea"
        classes="field-admin"
        label="Proposal description"
        name="description"
        required
      />
      <Field<V, "number">
        classes="field-admin"
        label="Endowment id"
        name="id"
        placeholder="0"
        required
        type="number"
      />
      <StatusPreview />
      <Label required className="-mb-4">
        New endowment status
      </Label>
      <StatusOptions />
      <Submitter type="submit" _classes="mt-4">
        Submit
      </Submitter>
    </FormContainer>
  );
}
