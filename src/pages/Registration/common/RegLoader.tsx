import Icon from "components/Icon";

export default function RegLoader() {
  return (
    <div className="flex gap-2 items-center">
      <Icon type="Loading" className="animate-spin" size={18} />
      Getting registration data..
    </div>
  );
}
