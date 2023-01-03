import { useBalancesQuery } from "services/apes";
import { useConnectedWallet } from "contexts/WalletGuard";
import Icon from "components/Icon";
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
          className="flex items-center font-heading font-bold text-sm"
        >
          <img src={t.logo} className="w-6 h-6 object-contain" alt="" />
          <span className="mr-auto ml-2">{t.symbol}</span>

          {t.gift && (
            <>
              <Icon
                type="Giftcard"
                className="text-green w-4 h-4 inline-block mr-0.5 relative bottom-px"
              />
              <span className="font-normal text-xs border-r border-gray-l2 dark:border-bluegray pr-1">
                {humanize(t.gift, 3, true)}
              </span>
            </>
          )}
          <span className="ml-1">{humanize(t.balance, 3, true)}</span>
        </div>
      ))}
      {tokens.length && (
        <div className="border-t border-gray-l2 dark:border-bluegray" />
      )}
    </>
  );
}
