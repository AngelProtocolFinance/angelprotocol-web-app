import { Modal } from "components/modal";
import { humanize } from "helpers";
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
      classes="h-96 fixed-center z-20 border border-gray-l3 bg-gray-l6 dark:bg-blue-d5 text-gray-d4 dark:text-white w-[91%] sm:w-full max-w-[39rem] rounded-sm overflow-hidden"
    >
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
          />
          <YAxis
            className="text-xs"
            domain={["dataMin - 100", "dataMax + 100"]}
            tickFormatter={humanize}
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
