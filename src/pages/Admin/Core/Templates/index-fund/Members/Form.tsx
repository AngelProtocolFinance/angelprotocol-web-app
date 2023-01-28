import { FundUpdateValues as FV } from "pages/Admin/types";
import Loader from "components/Loader";
import {
  FormContainer,
  GroupContainer,
  Submitter,
  TextArea,
} from "components/admin";
import { Label, TextInput } from "components/form";
import FundSelection from "../FundSelection";
import Adder from "./Adder";
import Member from "./Member";
import useInitFundMembers from "./useInitFundMembers";
import useUpdateFund from "./useUpdateFund";

export default function Form() {
  const { fundMembersCopy, isFundMembersLoading, isFundSelected } =
    useInitFundMembers();
  const { updateFund } = useUpdateFund();
  return (
    <FormContainer onSubmit={updateFund}>
      <TextInput<FV>
        classes="field-group-admin"
        label="Proposal title"
        name="title"
        required
      />
      <TextArea<FV> label="Proposal description" name="description" required />
      <Label required className="-mb-4">
        Select fund to update
      </Label>
      <FundSelection<FV> fieldName="fundId" />

      {isFundSelected && (
        <>
          <Label className="text-red-l1 mt-6 -mb-2">Remove member</Label>
          <GroupContainer>
            {(isFundMembersLoading && (
              <Loader
                gapClass="gap-1"
                widthClass="w-2"
                bgColorClass="bg-gray-d2"
              />
            )) ||
              (fundMembersCopy.length > 0 && (
                <div className="flex flex-col gap-2 mb-2">
                  {fundMembersCopy.map((member) => (
                    <Member key={member.addr} {...member} />
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
      {isFundSelected && (
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
