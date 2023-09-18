import { FormValues as FV } from "./types";
import { ErrorStatus } from "components/Status";
import {
  FormContainer,
  GroupContainer,
  Submitter,
  Tooltip,
} from "components/admin";
import { Field, Label } from "components/form";
import Adder from "./Adder";
import Member from "./Member";
import useInitFundMembers from "./useInitFundMembers";
import useUpdateFund from "./useUpdateFund";

export default function Form() {
  const { membersCopy } = useInitFundMembers();
  const { updateFund, tooltip } = useUpdateFund();
  return (
    <FormContainer onSubmit={updateFund} aria-disabled={!!tooltip}>
      {tooltip && <Tooltip tooltip={tooltip} />}
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

      {typeof membersCopy === "string" ? (
        <ErrorStatus>{membersCopy}</ErrorStatus>
      ) : (
        <>
          <Label className="text-red-l1 mt-6 -mb-2">Remove member</Label>
          <GroupContainer>
            {(membersCopy.length > 0 && (
              <div className="flex flex-col gap-2 mb-2">
                {membersCopy.map((member) => (
                  <Member key={member.id} {...member} />
                ))}
              </div>
            )) || (
              <p className="text-gray-d2 font-mono text-sm">
                this fund doesn't have any members yet
              </p>
            )}
          </GroupContainer>
        </>
      )}
      {typeof membersCopy !== "string" && (
        <>
          <Label className="text-green mt-6 -mb-2">add member</Label>
          <Adder />
        </>
      )}
      <Submitter type="button" onClick={updateFund} _classes="mt-4">
        Submit
      </Submitter>
    </FormContainer>
  );
}
