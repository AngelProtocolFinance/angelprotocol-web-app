import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { FormValues } from "./types";
import { useContractQuery } from "services/juno";
import { useGetter, useSetter } from "store/accessors";
import { setMembers } from "slices/admin/fundMembers";

export default function useInitFundMembers() {
  const { watch } = useFormContext<FormValues>();
  const fundId = watch("fundId");
  const fundIdRef = useRef<string | undefined>();
  const dispatch = useSetter();

  const { data: funds = [], isLoading } = useContractQuery("index-fund.funds", {
    startAfter: 0,
    limit: 10,
  });

  const fundMembers = funds.find((fund) => fund.id === +fundId)?.members || [];
  const fundMembersCopy = useGetter((state) => state.admin.fundMembers);

  useEffect(() => {
    if (fundIdRef.current === fundId) {
      return;
    }
    if (fundMembers.length > 0) {
      dispatch(
        setMembers(
          fundMembers.map((member) => ({
            id: `${member}`,
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
