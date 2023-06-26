import Icon from "components/Icon";

export default function Member({ address }: { address: string }) {
  return (
    <li className="flex gap-1 text-gray-d1 dark:text-gray items-center ">
      <Icon type="User" />
      <span className="text-sm ml-1 text-ellipsis overflow-hidden max-w-xs @lg:max-w-none">
        {address}
      </span>
    </li>
  );
}
