import {
  addWeeks,
  differenceInHours,
  endOfMonth,
  endOfWeek,
  format,
  formatDistance,
  getWeek,
  isWithinInterval,
  startOfWeek,
  subWeeks,
} from "date-fns";
import { useRef } from "react";

interface Week {
  id: string;
  start: Date;
  end: Date;
  isCurr: boolean;
  isMonthEnd: boolean;
}

const genWeeks = (): Week[] => {
  const now = new Date();
  const end = addWeeks(now, 52);
  const start = subWeeks(now, 52);

  let curr = start;
  const weeks: Week[] = [];
  while (curr <= end) {
    const YY = format(curr, "yy");
    const WW = getWeek(curr).toString().padStart(2, "0");
    const s = startOfWeek(curr);
    const e = endOfWeek(curr);

    const monthEnd = endOfMonth(s);

    const w: Week = {
      id: `${YY}${WW}`,
      start: s,
      end: e,
      isCurr: isWithinInterval(now, { start: s, end: e }),
      isMonthEnd: isWithinInterval(monthEnd, { start: s, end: e }),
    };
    curr = addWeeks(curr, 1);
    weeks.push(w);
  }
  return weeks;
};

const WeekProgressBar = () => {
  const now = new Date();
  const s = startOfWeek(now);
  const e = endOfWeek(now);

  const total = Math.abs(differenceInHours(e, s));
  const elapsed = Math.abs(differenceInHours(now, s));

  // Calculate progress
  const progress = (elapsed / total) * 100;

  return (
    <div className="w-full mt-4">
      <div className="flex justify-between text-sm text-gray-d2 mb-1">
        <span>Ends in {formatDistance(e, now)}</span>
      </div>
      <div className="w-full bg-gray-l3 rounded-full h-2">
        <div
          className="bg-blue rounded-full h-2 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default function Component() {
  const tableRef = useRef<HTMLDivElement>(null);
  const weeks = genWeeks();

  return (
    <div className="min-h-screen bg-gray-l5 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <WeekProgressBar />
          </div>
          <button
            onClick={() =>
              document
                .querySelector('[data-current-week="true"]')
                ?.scrollIntoView({ behavior: "smooth", block: "center" })
            }
            className="btn btn-blue px-4 py-2 text-sm"
          >
            <span>Current Week</span>
          </button>
        </div>
        <div className="bg-gray-l6 rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto" ref={tableRef}>
            <table className="min-w-full divide-y divide-gray-l3">
              <thead className="bg-gray-l4">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-body font-medium text-gray-d2 uppercase tracking-wider">
                    YYWW
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-body font-medium text-gray-d2 uppercase tracking-wider">
                    Date & Time Range
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-l6 divide-y divide-gray-l3">
                {weeks.map((w, index) => (
                  <tr
                    data-current-week={w.isCurr}
                    key={w.id}
                    className={
                      w.isCurr
                        ? "bg-blue-l4"
                        : w.isMonthEnd
                          ? "bg-amber-l5"
                          : index % 2 === 0
                            ? "bg-gray-l6"
                            : "bg-gray-l5"
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-d1">
                      {w.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray">
                      {format(w.start, "yyyy/MM/dd")} -{" "}
                      {format(w.end, "yyyy/MM/dd")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
