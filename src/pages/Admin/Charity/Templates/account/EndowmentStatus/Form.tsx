import { FormValues as FV } from "./types";
import { EndowmentStatusText } from "types/contracts";
import { Selector } from "components/Selector";
import { FormContainer, Submitter } from "components/admin";
import { Field, Label } from "components/form";
import Beneficiary from "./Beneficiary";
import useUpdateStatus from "./useUpdateStatus";

const statuses: EndowmentStatusText[] = [
  "approved",
  "closed",
  "frozen",
  "inactive",
];
//convert statuses tor {label: string, value: string}[]
const options = statuses.map((s) => ({
  label: s,
  value: s,
}));

export default function Form() {
  const { updateStatus } = useUpdateStatus();
  return (
    <FormContainer onSubmit={updateStatus}>
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
      <Field<FV>
        classes="field-admin"
        label="Endowment id"
        name="id"
        placeholder="0"
        required
      />
      <Label required className="-mb-4">
        New endowment status
      </Label>
      <Selector<FV, "status", EndowmentStatusText, false>
        name="status"
        options={options}
      >
        {({ value }) => value === "closed" && <Beneficiary />}
      </Selector>
      <Submitter type="submit" _classes="mt-4">
        Submit
      </Submitter>
    </FormContainer>
  );
}
//
