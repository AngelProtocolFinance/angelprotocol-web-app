import Icon from "components/Icon";
import { Info } from "components/Status";
import { dateToFormFormat } from "components/form";
import { isEmpty } from "helpers";
import { useFieldArray } from "react-hook-form";
import { FV } from "../types";
import Milestone from "./Milestone";

export default function Milestones() {
  const { fields, append, remove } = useFieldArray<FV, "milestones">({
    name: "milestones",
  });

  const onRemove = (idx: number) => remove(idx);

  return (
    <div className="@container grid gap-6 p-4 @lg:p-6 border border-prim rounded bg-white dark:bg-blue-d6">
      <div className="flex flex-col @md:flex-row items-center gap-3 justify-between">
        <h4 className="text-2xl">Milestones</h4>
        <button
          onClick={() =>
            append({
              milestone_date: dateToFormFormat(new Date()),
              milestone_description: { value: "" },
              milestone_title: `Milestone ${fields.length + 1}`,
              milestone_media: {
                name: "",
                preview: "",
                publicUrl: "",
              },
              idx: fields.length + 1,
            })
          }
          type="button"
          className="btn-outline-filled text-sm w-full @md:w-52 py-2"
        >
          <Icon type="Plus" className="mr-2" />
          <span>Add milestone</span>
        </button>
      </div>
      {!isEmpty(fields) ? (
        <>
          <span className="text-sm text-gray-d1 dark:text-gray">
            Milestones will be publicly displayed in descending order by their
            date.
          </span>
          <div className="grid gap-6">
            {fields.map((m, idx) => (
              <Milestone {...m} key={m.id} idx={idx} onRemove={onRemove} />
            ))}
          </div>
        </>
      ) : (
        <Info classes="text-base">No milestones</Info>
      )}
    </div>
  );
}
