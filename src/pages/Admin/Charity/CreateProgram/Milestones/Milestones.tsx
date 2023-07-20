import { useFieldArray } from "react-hook-form";
import { FV } from "../types";
import Icon from "components/Icon";
import { dateToFormFormat } from "components/form";
import Milestone from "./Milestone";

export default function Milestones() {
  const { fields, append } = useFieldArray<FV, "milestones">({
    name: "milestones",
  });
  return (
    <div className="grid gap-6 p-4 @lg:p-6 border border-prim rounded bg-white dark:bg-blue-d6">
      <div className="flex items-center gap-3 justify-between">
        <h4 className="text-2xl font-body">Milestones</h4>
        <button
          onClick={() =>
            append({
              milestone_date: dateToFormFormat(new Date()),
              milestone_description: "",
              milestone_title: `Milestone ${fields.length + 1}`,
              milestone_media: {
                name: "",
                preview: "",
                publicUrl: "",
              },
            })
          }
          type="button"
          className="btn-outline-filled text-sm w-52 py-2"
        >
          <Icon type="Plus" className="mr-2" />
          <span>Add milestone</span>
        </button>
      </div>
      <div className="grid gap-6">
        {fields.map((m) => (
          <Milestone {...m} key={m.id} />
        ))}
      </div>
    </div>
  );
}
