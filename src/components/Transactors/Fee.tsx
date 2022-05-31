import { CURRENCIES, MAIN_DENOM } from "constants/currency";
import { useGetter } from "store/accessors";

export default function Fee() {
  const { fee } = useGetter((state) => state.transaction);

  return (
    <div className="flex justify-between items-center text-xs font-heading text-blue-accent mb-2 mt-1">
      <p className="uppercase">tx fee</p>
      <p className="text-sm">
        {fee} {CURRENCIES[MAIN_DENOM].ticker}
      </p>
    </div>
  );
}
