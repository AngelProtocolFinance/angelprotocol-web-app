import { useGetter, useSetter } from "store/accessors";
import { setKYCOnly } from "slices/components/marketFilter";
import { Checkbox } from "./common";

const ID = `__kyc_check`;
export default function KYCFilter({ classes = "" }: { classes?: string }) {
  const isKYCOnly = useGetter((state) => state.component.marketFilter.kycOnly);
  const dispatch = useSetter();

  return (
    <div className={`grid ${classes}`}>
      <span className="font-bold text-xs font-heading uppercase">KYC</span>
      <div className="flex items-center mt-2">
        <Checkbox
          id={ID}
          checked={isKYCOnly}
          onChange={() => {
            dispatch(setKYCOnly(!isKYCOnly));
          }}
        />
        <label htmlFor={ID} className="ml-4 text-sm">
          Required
        </label>
      </div>
    </div>
  );
}
