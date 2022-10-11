import { FundUpdateValues as FV } from "pages/Admin/types";
import Loader from "components/Loader";
import {
  FormContainer,
  GroupContainer,
  Label,
  Submitter,
  TextInput,
} from "components/admin";
import FundSelection from "../FundSelection";
import Adder from "./Adder";
import Member from "./Member";
import useInitFundMembers from "./useInitFundMembers";
import useUpdateFund from "./useUpdateFund";

export default function Form() {
  const { fundMembersCopy, isFundMembersLoading, isFundSelected } =
    useInitFundMembers();
  const { updateFund, cw3MemberCount } = useUpdateFund();
  return (
    <FormContainer onSubmit={updateFund}>
      <TextInput<FV> title="Proposal Title" name="title" required />
      <TextInput<FV>
        title="proposal description"
        name="description"
        wide
        required
      />
      <Label _required>Select fund to update</Label>
      <FundSelection<FV> fieldName="fundId" />

      {isFundSelected && (
        <>
          <Label className="text-red-400 mt-6 -mb-2">Remove member</Label>
          <GroupContainer>
            {(isFundMembersLoading && (
              <Loader
                gapClass="gap-1"
                widthClass="w-2"
                bgColorClass="bg-angel-grey"
              />
            )) ||
              (fundMembersCopy.length > 0 && (
                <div className="flex flex-col gap-2 mb-2">
                  {fundMembersCopy.map((member) => (
                    <Member key={member.addr} {...member} />
                  ))}
                </div>
              )) || (
                <p className="text-angel-grey font-mono text-sm">
                  this fund doesn't have any members yet
                </p>
              )}
          </GroupContainer>
        </>
      )}
      {isFundSelected && (
        <>
          <Label className="text-green-400 mt-6 -mb-2">add member</Label>
          <Adder />
        </>
      )}
      <Submitter type="button" onClick={updateFund} _classes="mt-4">
        Submit{cw3MemberCount > 1 ? "proposal" : ""}
      </Submitter>
    </FormContainer>
  );
}
