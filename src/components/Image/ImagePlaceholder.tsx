import Icon from "../Icon";

type Props = { className?: string };

export default function ImagePlaceholder({ className }: Props) {
  return (
    <div
      className={`${className} flex items-center justify-center bg-blue-l3 dark:bg-blue`}
    >
      <Icon
        type="Picture"
        className="w-1/2 h-1/2 text-white dark:text-blue-l3"
      />
    </div>
  );
}
