import Icon from "components/Icon";

export function Tooltip({
  classes = "",
  type,
  message,
}: {
  type: "Loading" | "Info";
  message: string;
  classes?: string;
}) {
  return (
    <p className={`${classes} text-center`}>
      <Icon
        size={20}
        type={type}
        className={`relative inline bottom-[1px] mr-2 ${
          type === "Loading" ? "animate-spin" : ""
        }`}
      />
      {message}
    </p>
  );
}
