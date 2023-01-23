import { useMemo } from "react";
import { TokenWithBalance } from "types/aws";
import Icon from "components/Icon";
import { humanize, isEmpty } from "helpers";
import KadoOpener from "./KadoOpener";

type Props = {
  smallAmountsHidden: boolean;
  tokens: TokenWithBalance[];
};

const MIN_AMOUNT = 0.001;
export default function CoinBalances({ smallAmountsHidden, tokens }: Props) {
  const filtered = useMemo(
    () =>
      tokens.filter(
        (token) =>
          //show atleast native
          (token.balance > 0 && !smallAmountsHidden) ||
          token.balance > MIN_AMOUNT ||
          (token.gift || 0) > 0
      ),
    [tokens, smallAmountsHidden]
  );

  if (isEmpty(filtered)) {
    return (
      <span className="text-sm">
        Your wallet is empty. <KadoOpener />
      </span>
    );
  }

  return (
    <>
      {filtered.map((t) => (
        <div
          key={t.token_id}
          className="flex items-center font-heading font-bold text-sm"
        >
          <img src={t.logo} className="w-6 h-6 object-contain" alt="" />
          <span className="mr-auto ml-2">{t.symbol}</span>

          {t.gift ? (
            <>
              <Icon
                type="Giftcard"
                className="text-green w-4 h-4 inline-block mr-0.5 relative bottom-px"
              />
              <span className="font-normal text-xs border-r border-prim pr-1">
                {humanize(t.gift, 3, true)}
              </span>
            </>
          ) : null}
          <span className="ml-1">{humanize(t.balance, 3, true)}</span>
        </div>
      ))}
      {!isEmpty(filtered) && <div className="border-t border-prim" />}
    </>
  );
}
