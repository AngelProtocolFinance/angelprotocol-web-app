import { FC } from "react";

interface MobileTableProps {
  title: string;
  data: string | JSX.Element;
}

const MobileRow: FC<MobileTableProps> = ({ title, data }) => {
  return (
    <div className="flex justify-between dark:bg-blue-d7 p-4 border-b-[1px] border-gray-l2 dark:border-bluegray">
      <span className="text-gray-d2 dark:text-white font-bold uppercase">
        {title}
      </span>
      {typeof data === "string" ? (
        <span className="text-gray-d2 dark:text-white">{data}</span>
      ) : (
        data
      )}
    </div>
  );
};

export default MobileRow;
