import { ArrowDown, ArrowUp } from "lucide-react";
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
  if (!data || data.all.length === 0) return null;
  return (
    <div className={classes + " inline relative bottom-1"}>
      <button
        type="button"
        onClick={() => expand(true)}
        className={
          "text-xs font-semibold rounded-sm focus:outline-none  " +
          (data.twr > 0 ? "text-green" : data.twr < 0 ? "text-red" : "")
        }
      >
        {data.twr > 0 ? (
          <ArrowUp className="relative bottom-px inline mr-0.5" size={14} />
        ) : data.twr < 0 ? (
          <ArrowDown className="relative bottom-px inline mr-0.5" size={14} />
        ) : (
          ""
        )}
        {(data.twr * 100).toFixed(2)}%
      </button>
      {expanded && (
        <SfPerChart {...data} open={expanded} onClose={() => expand(false)} />
      )}
    </div>
  );
}
