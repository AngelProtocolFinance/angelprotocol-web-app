import { useFormContext } from "react-hook-form";
import { CW3ConfigValues as CV } from "pages/Admin/types";
import { FormContainer, Submitter, TextInput } from "components/admin";
import usePropose from "./useCreateProposal";

export default function Form() {
  const { createProposal, isSubmitDisabled, isTime } = usePropose();
  return (
    <FormContainer onSubmit={createProposal}>
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
        title={`voting period (${isTime ? "seconds" : "blocks"})`}
        name="duration"
        required
        mono
      />
      <RequireExecutionCheckbox />
      <Submitter type="submit" _classes="mt-4" disabled={isSubmitDisabled}>
        Submit
      </Submitter>
    </FormContainer>
  );
}

function RequireExecutionCheckbox() {
  const { register } = useFormContext<CV>();
  return (
    <div
      className="text-angel-grey flex items-center p-3 rounded-md 
    shadow-inner-white-grey bg-light-grey my-6"
    >
      <input
        {...register("require_execution")}
        type="checkbox"
        className="mr-2"
        id="__checkInput"
      />
      <label
        htmlFor="__checkInput"
        className="text-xs font-heading uppercase font-bold text-angel-grey
        select-none cursor-pointer"
      >
        execution required
      </label>
    </div>
  );
}
