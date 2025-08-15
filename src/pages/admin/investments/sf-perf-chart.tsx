import { Modal } from "components/modal";
import { humanize } from "helpers/decimal";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { INpoMetrics } from "types/npo-sf-metrics";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
  });
};

export function SfPerChart(
  props: INpoMetrics & { open: boolean; onClose: () => void }
) {
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      classes="h-96 p-4 fixed-center z-20 border border-gray-l3 bg-gray-l6 dark:bg-blue-d5 text-gray-d4 dark:text-white w-[91%] sm:w-full max-w-[39rem] rounded-sm overflow-hidden"
    >
      <div className="flex flex-wrap gap-y-2 justify-between">
        <h4>Investment performance</h4>
        <div className="flex gap-x-2 items-center">
          <button
            type="button"
            className="font-heading btn-blue text-xs px-2 py-1 rounded-sm uppercase pointer-events-none"
          >
            3 months
          </button>
          <button
            disabled
            type="button"
            className="font-heading btn-outline text-xs px-2 py-1 rounded-sm uppercase"
          >
            1 year
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={props.points}
          margin={{
            top: 40,
            right: 30,
            left: 30,
            bottom: 40,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            className="text-xs"
            dataKey="date"
            tickFormatter={formatDate}
            angle={-45}
            textAnchor="end"
            height={35}
            dy={10}
            type="category"
            interval={0}
          />
          <YAxis
            yAxisId="left"
            className="text-xs"
            domain={["dataMin", "dataMax"]}
            tickFormatter={(v) => humanize(v, 2)}
            label={{ value: "Units", angle: -90, position: "insideLeft" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            className="text-xs"
            domain={["dataMin", "dataMax"]}
            tickFormatter={(v) => humanize(v, 2)}
            label={{ value: "NAVPU ($)", angle: 90, position: "insideRight" }}
          />
          <Tooltip
            content={({ payload, active }) => {
              if (active && payload && payload.length > 0) {
                const data = payload[0].payload;
                return (
                  <div className="text-sm font-semibold text-gray-d4 pointer-events-none">
                    ${humanize(data.value)}
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar
            yAxisId="left"
            dataKey="units"
            fill="var(--color-blue-l2)"
            opacity={0.6}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="price"
            stroke="var(--color-blue-d1)"
            dot={false}
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Modal>
  );
}
