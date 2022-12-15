import { Token } from "types/aws";
import { humanize } from "helpers";

export default function CoinBalances({ coins }: { coins: Token[] }) {
  return (
    <>
      {coins.map((coin) => (
        <div
          key={coin.token_id}
          className="flex justify-between items-center gap-2 font-heading font-bold text-sm"
        >
          <span className="flex items-center gap-2">
            <img src={coin.logo} className="w-6 h-6 object-contain" alt="" />
            {coin.symbol}
          </span>
          {humanize(coin.balance, 3, true)}
        </div>
      ))}
    </>
  );
}
