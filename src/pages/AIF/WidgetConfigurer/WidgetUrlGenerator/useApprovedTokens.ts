import { useEffect, useState } from "react";
import { useLazyTokensQuery } from "services/apes";
import { useErrorContext } from "contexts/ErrorContext";

export default function useApprovedTokens(): string[] {
  const [approvedTokens, setApprovedTokens] = useState<string[]>([]);
  const { handleError } = useErrorContext();

  const [getTokens] = useLazyTokensQuery();

  useEffect(() => {
    getTokens({}, true)
      .unwrap()
      .then((tokens) => {
        const approvedTokenSymbols: string[] = [];
        tokens.forEach(
          (token) => token.approved && approvedTokenSymbols.push(token.symbol)
        );
        setApprovedTokens(approvedTokenSymbols);
      })
      .catch((err) => handleError(err));
  }, [getTokens, handleError]);

  return approvedTokens;
}
