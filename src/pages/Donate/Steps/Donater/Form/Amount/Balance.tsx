import { useFormContext } from "react-hook-form";
import { DonateValues } from "../../types";
import Icon from "components/Icon";
import { humanize } from "helpers";

export default function Balance() {
  const { watch, setValue } = useFormContext<DonateValues>();
  const token = watch("token");
  function setMaxVal() {
    setValue("token.amount", humanize(token.balance + (token.gift || 0), 4), {
      shouldDirty: true,
      shouldValidate: true,
    });
  }
  return (
    <button
      type="button"
      onClick={setMaxVal}
      className="text-right hover:text-blue text-xs"
    >
      <span>
        BAL: {humanize(+token.balance, 3)} {token.symbol}
      </span>
      {token.gift && (
        <>
          <span>+</span>
          <Icon type="Giftcard" className="w-4 h-4 text-green" />
          {humanize(+token.balance, 3)}
        </>
      )}
    </button>
  );
}
