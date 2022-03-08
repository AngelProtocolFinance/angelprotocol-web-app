import Label from "pages/Admin/Templates/components/Label";
import Loader from "components/Loader/Loader";
import TextInput from "../components/TextInput";
import FundSelection from "../components/FundSelection";
import useUpdateFund from "./useUpdateFund";
import { FundUpdateValues as FV } from "./fundUpdatorSchema";
import useInitFundMembers from "./useInitFundMembers";
import MemberItem from "./MemberItem";
import MemberAdder from "./MemberAdder/MemberAdder";

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
      <Label text="Select fund to update" required />
      <FundSelection<FV> />

      {isFundSelected && (
        <>
          <Label text="remove member" textColor="text-red-400 mt-6" />
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
          <Label text="add member" textColor="text-green-400 mt-6" />
          <MemberAdder />
        </>
      )}

      <button
        type="button"
        onClick={updateFund}
        className="justify-self-center text-blue-accent hover:text-angel-blue uppercase text-white font-extrabold mt-4"
      >
        Propose changes
      </button>
    </form>
  );
}
