import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { setMembers } from "services/admin/fundMembers";
import { useFundMembers } from "services/terra/indexFund/queriers";
import { useGetter, useSetter } from "store/accessors";
import { FundUpdateValues } from "./fundUpdatorSchema";

export default function useInitFundMembers() {
  const { watch } = useFormContext<FundUpdateValues>();
  const fundId = watch("fundId");
  const dispatch = useSetter();
  const { fundMembers, isFundMembersLoading } = useFundMembers(fundId);
  const fundMembersCopy = useGetter((state) => state.admin.fundMembers);

  useEffect(() => {
    if (fundMembers.length > 0) {
      dispatch(
        setMembers(
          fundMembers.map((member) => ({
            addr: member,
            isDeleted: false,
            isAdded: false,
          }))
        )
      );
    } else {
      dispatch(setMembers([]));
    }
    //eslint-disable-next-line
  }, [fundMembers, fundId]);

  return {
    fundMembersCopy,
    isFundMembersLoading,
    isFundSelected: fundId !== "",
  };
}
