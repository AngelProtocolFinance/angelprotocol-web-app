import Icon from "components/Icon";

export default function RegLoader(props: { message?: string }) {
  return (
    <div className="flex gap-2 items-center justify-center">
      <Icon type="Loading" className="animate-spin" size={18} />
      {props.message || "Getting registration data.."}
    </div>
  );
}
