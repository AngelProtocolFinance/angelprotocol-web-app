import { useMemo } from "react";
import { TokenWithBalance } from "types/tx";
import Image from "components/Image";
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
          token.balance > MIN_AMOUNT
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
          key={t.token_id + t.type}
          className="flex items-center font-heading font-bold text-sm"
        >
          <Image src={t.logo} className="w-6 h-6" />
          <span className="mr-auto ml-2">{t.symbol}</span>
          <span className="ml-1">{humanize(t.balance, 3, true)}</span>
        </div>
      ))}
      <div className="border-t border-gray-l3 dark:border-bluegray" />
    </>
  );
}
