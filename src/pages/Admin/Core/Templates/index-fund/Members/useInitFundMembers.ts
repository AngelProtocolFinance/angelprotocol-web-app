import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { FormValues } from "./types";
import { AddressWithFlags } from "slices/admin/types";
import { useContractQuery } from "services/juno";
import { useGetter, useSetter } from "store/accessors";
import { setMembers } from "slices/admin/fundMembers";
import { hasElapsed } from "helpers/admin";

export default function useInitFundMembers() {
  const { watch } = useFormContext<FormValues>();
  const fundId = watch("fundId");
  const fundIdRef = useRef<string | undefined>();
  const dispatch = useSetter();

  const {
    data: fund,
    isLoading,
    isFetching,
    isError,
  } = useContractQuery(
    "index-fund.fund",
    {
      id: +fundId,
    },
    !fundId
  );

  const fundMembers = fund?.endowments || [];
  const fundMembersCopy = useGetter((state) => state.admin.fundMembers);

  useEffect(() => {
    if (isLoading || isFetching) return;
    if (fundIdRef.current === fundId) return;

    if (fundMembers.length > 0) {
      fundIdRef.current = fundId;
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
  }, [fundMembers, fundId, isLoading, isFetching]);

  const members: string | AddressWithFlags[] = isLoading
    ? "Loading fund..."
    : isError || !fund
    ? "Fund not found"
    : fund.expiryTime !== 0 && hasElapsed(fund.expiryTime)
    ? "Fund has expired"
    : fundMembersCopy;

  return {
    membersCopy: members,
  };
}
