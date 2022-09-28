import Icon from "components/Icon";

export default function ReceiptTooltip({ classes = "" }: { classes?: string }) {
  return (
    <p className={`flex gap-1 items-center text-xs text-angel-grey ${classes}`}>
      <Icon type="Info" size={14} />A receipt can be provided after your
      donation is made.
    </p>
  );
}
