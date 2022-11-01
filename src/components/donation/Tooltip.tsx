import Icon from "components/Icon";

export function Tooltip({
  type,
  message,
}: {
  type: "Loading" | "Info";
  message: string;
}) {
  return (
    <p className="text-center">
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
