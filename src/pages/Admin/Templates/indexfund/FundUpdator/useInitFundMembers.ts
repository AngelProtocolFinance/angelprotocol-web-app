import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { FundUpdateValues } from "pages/Admin/types";
import { useFundListQuery } from "services/juno/indexFund";
import { queryObject } from "services/juno/queryContract/queryObjects";
import { useGetter, useSetter } from "store/accessors";
import { setMembers } from "slices/admin/fundMembers";
import { contracts } from "constants/contracts";

export default function useInitFundMembers() {
  const { watch } = useFormContext<FundUpdateValues>();
  const fundId = watch("fundId");
  const fundIdRef = useRef<string | undefined>();
  const dispatch = useSetter();

  const { fundMembers = [], isFundMembersLoading } = useFundListQuery(
    { address: contracts.index_fund, msg: queryObject.ifFunds },
    {
      selectFromResult: ({ data, isLoading, isFetching }) => ({
        fundMembers: data?.find((fund) => fund.id === +fundId)?.members,
        isFundMembersLoading: isLoading || isFetching,
      }),
    }
  );
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
