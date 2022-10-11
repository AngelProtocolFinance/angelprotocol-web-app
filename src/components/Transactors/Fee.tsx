import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useGetter } from "store/accessors";

export default function Fee() {
  const { fee } = useGetter((state) => state.transaction);
  const { wallet } = useGetWallet();

  return (
    <div className="flex justify-between items-center text-xs font-heading text-blue-d1 mb-2 mt-1">
      <p className="uppercase">tx fee</p>
      <p className="text-sm">
        {fee} {wallet?.chain.native_currency.symbol}
      </p>
    </div>
  );
}
