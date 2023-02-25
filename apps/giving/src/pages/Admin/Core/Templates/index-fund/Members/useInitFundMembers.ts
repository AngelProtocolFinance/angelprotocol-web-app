import { useFundListQuery } from "@giving/services/juno/indexFund";
import { setMembers } from "@giving/slices/admin/fundMembers";
import { useGetter, useSetter } from "@giving/store";
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { FundUpdateValues } from "@giving/types/pages/admin";

export default function useInitFundMembers() {
  const { watch } = useFormContext<FundUpdateValues>();
  const fundId = watch("fundId");
  const fundIdRef = useRef<string | undefined>();
  const dispatch = useSetter();

  const { fundMembers = [], isFundMembersLoading } = useFundListQuery(null, {
    selectFromResult: ({ data, isLoading, isFetching }) => ({
      fundMembers: data?.find((fund) => fund.id === +fundId)?.members,
      isFundMembersLoading: isLoading || isFetching,
    }),
  });
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
