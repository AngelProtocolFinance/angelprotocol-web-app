import Icon from "components/Icon";

export default function Loading({
  message,
  classes = "",
}: {
  message: string;
  classes?: string;
}) {
  return (
    <div className={`flex flex-col justify-center gap-6 ${classes}`}>
      <Icon type="Loading" size={113} className="animate-spin text-orange" />
      <p className="text-center">{message}</p>
    </div>
  );
}
