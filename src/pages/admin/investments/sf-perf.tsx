import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";
import use_swr from "swr/immutable";
import type { INpoMetrics } from "types/npo-sf-metrics";
import { SfPerChart } from "./sf-perf-chart";

interface Props {
  id: number;
  classes?: string;
}

const fetcher = (path: string) =>
  fetch(path).then<INpoMetrics>((res) => res.json());

export function SfPerf({ id, classes = "" }: Props) {
  const [expanded, expand] = useState(false);
  const { data = { points: [], total_return: 0 } } = use_swr(
    `/api/npo/${id}/sf-metrics`,
    fetcher
  );
  if (data.points.length === 0) return null;
  return (
    <div className={`${classes} inline relative bottom-1`}>
      <button
        type="button"
        onClick={() => expand(true)}
        className={`text-xs font-semibold rounded-sm focus:outline-none  ${
          data.total_return > 0
            ? "text-green"
            : data.total_return < 0
              ? "text-red"
              : ""
        }`}
      >
        {data.total_return > 0 ? (
          <ArrowUp className="relative bottom-px inline mr-0.5" size={14} />
        ) : data.total_return < 0 ? (
          <ArrowDown className="relative bottom-px inline mr-0.5" size={14} />
        ) : (
          ""
        )}
        {(data.total_return * 100).toFixed(2)}%
      </button>
      {expanded && (
        <SfPerChart {...data} open={expanded} onClose={() => expand(false)} />
      )}
    </div>
  );
}
