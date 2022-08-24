import { useChain } from "contexts/ChainGuard";
import { useGetter } from "store/accessors";

export default function Fee() {
  const { fee } = useGetter((state) => state.transaction);
  const chain = useChain();

  return (
    <div className="flex justify-between items-center text-xs font-heading text-blue-accent mb-2 mt-1">
      <p className="uppercase">tx fee</p>
      <p className="text-sm">
        {fee} {chain.native_currency.symbol}
      </p>
    </div>
  );
}
