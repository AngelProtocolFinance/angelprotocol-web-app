import { BalanceProps } from "./types";
import Icon from "components/Icon";
import { humanize } from "helpers";

export default function Balance({
  token,
  onSetAmount,
  isGiftEnabled,
}: BalanceProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onSetAmount(token.balance)}
        className="text-right hover:text-blue text-xs flex"
      >
        BAL: {humanize(+token.balance, 3)} {token.symbol}
      </button>
      {token.gift && isGiftEnabled ? (
        <button
          type="button"
          onClick={() => onSetAmount(token.gift || 0)}
          className="text-right hover:text-blue text-xs flex"
        >
          <Icon type="Giftcard" className="w-4 h-4 text-green mr-0.5" />
          {humanize(+token.gift, 3)}
        </button>
      ) : null}
    </div>
  );
}
