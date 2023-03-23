import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { FundUpdateValues } from "pages/Admin/types";
import useQueryContract from "services/contract/useQueryContract";
import { useGetter, useSetter } from "store/accessors";
import { setMembers } from "slices/admin/fundMembers";

export default function useInitFundMembers() {
  const { watch } = useFormContext<FundUpdateValues>();
  const fundId = watch("fundId");
  const fundIdRef = useRef<string | undefined>();
  const dispatch = useSetter();

  const { data, isLoading } = useQueryContract("index-fund", "ifFunds", null);

  const fundMembers =
    data?.funds.find((fund) => fund.id === +fundId)?.members || [];
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
    isFundMembersLoading: isLoading,
    isFundSelected: fundId !== "",
  };
}
