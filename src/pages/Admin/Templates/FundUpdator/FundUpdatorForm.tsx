import { FundUpdateValues as FV } from "pages/Admin/types";
import Label from "pages/Admin/components/Label";
import {
  FormContainer,
  GroupContainer,
} from "pages/Admin/components/TemplateContainer";
import Loader from "components/Loader";
import TextInput from "../../components/TextInput";
import FundSelection from "../FundSelection";
import Submitter from "../Submitter";
import MemberAdder from "./MemberAdder/MemberAdder";
import MemberItem from "./MemberItem";
import useInitFundMembers from "./useInitFundMembers";
import useUpdateFund from "./useUpdateFund";

export default function FundUpdatorForm() {
  const { fundMembersCopy, isFundMembersLoading, isFundSelected } =
    useInitFundMembers();
  const { updateFund } = useUpdateFund();
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
                    <MemberItem key={member.addr} {...member} />
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
          <MemberAdder />
        </>
      )}
      <Submitter type="button" onClick={updateFund} _classes="mt-4">
        Submit Proposal
      </Submitter>
    </FormContainer>
  );
}
