import Icon from "components/Icon";

export default function ReceiptTooltip() {
  return (
    <p className="flex gap-1 items-center text-xs text-gray-d2 mb-5">
      <Icon type="Info" size={14} />A receipt can be provided after your
      donation is made.
    </p>
  );
}
