import { ErrorMessage } from "@hookform/error-message";
import type { FC } from "react";

type DateRangeProps = {
  register: any;
  errors: any;
};

const DateRange: FC<DateRangeProps> = ({ register, errors }) => {
  return (
    <div className="flex flex-col text-gray-d2 gap-2">
      <label className="dark:text-white">Date</label>
      <div className="flex gap-4">
        <input
          {...register("startDate")}
          type="date"
          className="relative filter-date w-full py-3 pl-3 border border-gray-l2 dark:border-bluegray rounded-sm dark:text-gray dark:bg-blue-d6 dark:placeholder:text-gray"
          placeholder="From"
        />
        <input
          {...register("endDate")}
          type="date"
          className="relative filter-date w-full py-3 pl-3 border border-gray-l2 dark:border-bluegray rounded-sm dark:text-gray dark:bg-blue-d6 dark:placeholder:text-gray"
          placeholder="To"
        />
      </div>
      <ErrorMessage
        errors={errors}
        as="span"
        name="startDate"
        className="w-full text-xs text-red-l4 dark:text-red-l2"
      />
      <ErrorMessage
        errors={errors}
        as="p"
        name="endDate"
        className="w-full text-xs text-red-l4 dark:text-red-l2"
      />
    </div>
  );
};
export default DateRange;
