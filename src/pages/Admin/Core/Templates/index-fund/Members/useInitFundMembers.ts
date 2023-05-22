import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { FormValues } from "./types";
import { useContractQuery, useLatestBlockQuery } from "services/juno";
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
    isError,
  } = useContractQuery("index-fund.fund", {
    id: +fundId,
  });

  const { data: height = "0" } = useLatestBlockQuery({});

  const fundMembers = fund?.members || [];
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

  const members = isLoading
    ? "Loading fund..."
    : isError || !fund
    ? "Fund not found"
    : (fund.expiryTime !== 0 && hasElapsed(fund.expiryTime)) ||
      (fund.expiryHeight !== 0 && +fund.expiryHeight >= +height)
    ? "Fund has expired"
    : fundMembersCopy;

  return {
    membersCopy: members,
  };
}
