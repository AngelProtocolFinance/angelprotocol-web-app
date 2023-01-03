import { useBalancesQuery } from "services/apes";
import { useConnectedWallet } from "contexts/WalletGuard";
import { humanize } from "helpers";
import KadoOpener from "./KadoOpener";

const MIN_AMOUNT = 0.001;
export default function CoinBalances({ isSmallAmountsShown = true }) {
  const { address, chainId } = useConnectedWallet();

  const { data: tokens, isLoading } = useBalancesQuery(
    {
      address,
      chainId,
    },
    {
      selectFromResult({ data = [], ...rest }) {
        return {
          ...rest,
          data: data.filter(
            (token) =>
              //show atleast native
              (token.balance > 0 && !isSmallAmountsShown) ||
              token.balance > MIN_AMOUNT ||
              (token.gift || 0) > 0
          ),
        };
      },
    }
  );

  if (isLoading) {
    return (
      <p className="text-sm text-gray-d1 dark:text-gray">fetching balances..</p>
    );
  }

  if (tokens.length <= 0) {
    return (
      <span className="text-sm">
        Your wallet is empty. <KadoOpener />
      </span>
    );
  }

  return (
    <>
      {tokens.map((t) => (
        <div
          key={t.token_id}
          className="flex justify-between items-center gap-2 font-heading font-bold text-sm "
        >
          <span className="flex items-center gap-2">
            <img src={t.logo} className="w-6 h-6 object-contain" alt="" />
            {t.symbol}
          </span>
          {humanize(t.balance, 3, true)}

          {/** show giftcard balance here */}
        </div>
      ))}
    </>
  );
}
