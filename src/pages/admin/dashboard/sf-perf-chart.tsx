import { Modal } from "components/modal";
import { humanize } from "helpers/decimal";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Item, SfwPage } from "types/npo-sfws";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
  });
};

export function SfPerChart(
  props: SfwPage & { open: boolean; onClose: () => void }
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
            className="font-heading btn-outline text-xs px-2 py-1 rounded-sm uppercase pointer-events-none"
          >
            6 months
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
        <LineChart
          data={props.all}
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
            className="text-xs"
            domain={["dataMin", "dataMax"]}
            tickFormatter={(v) => humanize(v, 2)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="end"
            stroke="var(--color-blue-d1)"
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </Modal>
  );
}

interface ICustomTooltip {
  active?: boolean;
  payload?: Array<{
    payload: Item;
  }>;
  label?: string;
}
const CustomTooltip: React.FC<ICustomTooltip> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white px-2 py-1 border border-gray-l3 rounded-sm text-xs font-heading">
        <p className="text-gray flex gap-x-2">
          <span className=""> {formatDate(label ?? "")}</span>
          <span className="text-gray-d1">{humanize(data.end)}</span>
        </p>
        {data.flow ? (
          data.flow > 0 ? (
            <p className="pt-2 mt-2 border-t border-gray-l3 text-green">
              Deposit
            </p>
          ) : (
            <p className="pt-2 mt-2 border-t border-gray-l3 text-red">
              Withdrawal
            </p>
          )
        ) : null}

        {data.flow ? <p>${humanize(Math.abs(data.flow))}</p> : null}
      </div>
    );
  }
  return null;
};
