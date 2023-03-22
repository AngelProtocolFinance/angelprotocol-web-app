import Icon from "../Icon";

type Props = { classes: { container?: string; icon?: string } };

export default function ImagePlaceholder({ classes }: Props) {
  const { container = "", icon = "" } = classes;
  return (
    <div
      className={`${container} flex items-center justify-center bg-blue-l3 dark:bg-blue`}
    >
      <Icon type="Picture" className={`${icon} text-white dark:text-blue-l3`} />
    </div>
  );
}
