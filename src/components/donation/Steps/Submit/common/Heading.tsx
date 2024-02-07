import Icon from "components/Icon";

export default function Heading({ classes = "" }) {
  return (
    <h4 className={`flex items-center text-lg gap-2 ${classes}`}>
      <Icon type="StickyNote" />
      <span className="font-semibold">Your donation summary</span>
    </h4>
  );
}
