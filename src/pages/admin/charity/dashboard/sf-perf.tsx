import { useState } from "react";
import useSWR from "swr/immutable";
import type { SfwPage } from "types/npo-sfws";
import { SfPerChart } from "./sf-perf-chart";

interface Props {
  id: number;
  classes?: string;
}

const sfwPage = (id: string) =>
  fetch(`/api/npo/${id}/sfws`).then<SfwPage>((res) => res.json());

export function SfPerf({ id, classes = "" }: Props) {
  const [expanded, expand] = useState(false);
  const { data } = useSWR(id.toString(), sfwPage);
  if (!data) return null;
  return (
    <div className={classes + " inline relative bottom-1"}>
      <button
        type="button"
        onClick={() => expand(true)}
        className={
          "text-[0.6rem] font-semibold px-2 py-0.5 rounded-sm  " +
          (data.twr > 0 ? "btn-green" : data.twr < 0 ? "btn-red" : "")
        }
      >
        {(data.twr * 100).toFixed(2)}%
      </button>
      {expanded && (
        <SfPerChart {...data} open={expanded} onClose={() => expand(false)} />
      )}
    </div>
  );
}
