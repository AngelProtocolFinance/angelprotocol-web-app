import Icon from "./Icon";

type Props = { classes: { container?: string; icon?: string } };

export default function LogoPlaceholder({ classes }: Props) {
  const { container = "", icon = "" } = classes;
  return (
    <div
      className={`${container} flex items-center justify-center bg-blue-l3 dark:bg-blue border border-gray-l2 rounded-full dark:border-bluegray`}
    >
      <Icon type="Picture" className={`${icon} text-white dark:text-blue-l3`} />
    </div>
  );
}
