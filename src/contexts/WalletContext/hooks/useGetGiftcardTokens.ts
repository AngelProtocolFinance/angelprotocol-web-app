import { useEffect, useMemo } from "react";
import { Chain, Token } from "types/aws";
import { GENERIC_ERROR_MESSAGE } from "pages/Registration/constants";
import { useGiftcardBalanceQuery } from "services/juno/giftcard";
import { useErrorContext } from "contexts/ErrorContext";

export function useGetGiftcardTokens(
  addr = "",
  chain: Chain
): {
  data: Token[];
  isLoading: boolean;
} {
  const { handleError } = useErrorContext();

  const supportedTokens = useMemo(
    () => [chain.native_currency, ...chain.tokens],
    [chain]
  );

  const {
    data = [],
    isLoading,
    isFetching,
    isError,
    error,
  } = useGiftcardBalanceQuery(
    { addr, supportedTokens },
    { skip: !addr || chain.type !== "juno-native" }
  );

  const isAnyLoading = isLoading || isFetching;

  useEffect(() => {
    if (isAnyLoading) {
      return;
    }

    if (isError) {
      return handleError(
        error || "Error occurred loading giftcard balances",
        GENERIC_ERROR_MESSAGE
      );
    }
  }, [error, isAnyLoading, isError, handleError]);

  return { data, isLoading: isAnyLoading };
}
