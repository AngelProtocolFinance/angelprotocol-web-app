import Icon from "components/Icon";

export default function ReceiptTooltip() {
  return (
    <p className="flex gap-1 items-center text-xs text-angel-grey mb-5">
      <Icon type="Info" size={14} />
      <i>Note:</i> A receipt can be provided after your donation is made.
    </p>
  );
}
