import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { FundUpdateValues } from "@types-page/admin";
import { useFundMembers } from "services/terra/indexFund/queriers";
import { setMembers } from "slices/admin/fundMembers";
import { useGetter, useSetter } from "store/accessors";

export default function useInitFundMembers() {
  const { watch } = useFormContext<FundUpdateValues>();
  const fundId = watch("fundId");
  const fundIdRef = useRef<string | undefined>();
  const dispatch = useSetter();
  const { fundMembers, isFundMembersLoading } = useFundMembers(fundId);
  const fundMembersCopy = useGetter((state) => state.admin.fundMembers);

  useEffect(() => {
    if (fundIdRef.current === fundId) {
      return;
    }
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
      fundIdRef.current = fundId;
    } else {
      dispatch(setMembers([]));
      fundIdRef.current = fundId;
    }
    //eslint-disable-next-line
  }, [fundMembers, fundId]);

  return {
    fundMembersCopy,
    isFundMembersLoading,
    isFundSelected: fundId !== "",
  };
}
