import Icon from "../Icon";

export default function LogoPlaceholder({ className = "" }) {
  return (
    <div
      className={`${className} flex items-center justify-center bg-blue-l3 dark:bg-blue border border-prim rounded-full `}
    >
      <Icon
        type="Picture"
        className="w-1/2 h-1/2 text-white dark:text-blue-l3"
      />
    </div>
  );
}
