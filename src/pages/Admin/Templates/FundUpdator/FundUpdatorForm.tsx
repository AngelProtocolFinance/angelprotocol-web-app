import Label from "pages/Admin/components/Label";
import Loader from "components/Loader/Loader";
import TextInput from "../../components/TextInput";
import FundSelection from "../FundSelection";
import useUpdateFund from "./useUpdateFund";
import { FundUpdateValues as FV } from "./fundUpdatorSchema";
import useInitFundMembers from "./useInitFundMembers";
import MemberItem from "./MemberItem";
import MemberAdder from "./MemberAdder/MemberAdder";
import Submitter from "../Submitter";

export default function FundUpdatorForm() {
  const { fundMembersCopy, isFundMembersLoading, isFundSelected } =
    useInitFundMembers();
  const { updateFund } = useUpdateFund();
  return (
    <form
      onSubmit={updateFund}
      className="w-full p-6 rounded-md grid content-start rounded-md bg-white-grey"
    >
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
          <Label _classes="text-red-400 mt-6">Remove member</Label>
          <div className="p-3 rounded-md bg-light-grey shadow-inner-white-grey">
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
          </div>
        </>
      )}
      {isFundSelected && (
        <>
          <Label _classes="text-green-400 mt-6">add member</Label>
          <MemberAdder />
        </>
      )}
      <Submitter type="button" onClick={updateFund} _classes="mt-4">
        Propose Changes
      </Submitter>
    </form>
  );
}
