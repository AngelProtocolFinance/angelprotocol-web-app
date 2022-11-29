import Copier from "components/Copier";

export default function Address({ value }: { value: string }) {
  return (
    <div className="flex items-center justify-between w-full gap-2 p-4 pl-3 bg-gray-l4 dark:bg-bluegray-d1 border border-gray-l2 dark:border-bluegray rounded">
      <span className="max-w-[75vw] sm:w-56 font-body font-normal text-sm truncate hover:cursor-default">
        {value}
      </span>
      <Copier text={value} classes="w-6 h-6 hover:text-orange" />
    </div>
  );
}
