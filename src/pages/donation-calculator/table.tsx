import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { laira } from "assets/laira/laira";
import { Image } from "components/image";
import { toUsd } from "helpers/to-usd";
import { TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";
import type { View } from "./types";
import { Usd } from "./usd";

interface Props extends View {
  classes?: string;
}

export function Table({ classes = "", ...v }: Props) {
  const [idx, setIdx] = useState(0);
  // Array of time periods
  const periods = [
    { label: "1 Year", value: 1 },
    { label: "5 Year", value: 5 },
    { label: "10 Year", value: 10 },
  ];

  const p = v.projection[periods[idx].value - 1];

  return (
    <div className={`${classes} p-6 @container`}>
      <div
        className={`${
          p.total > 0 ? "bg-green-l5" : p.total < 0 ? "bg-red-l5" : "bg-gray-l4"
        } p-4 @md:p-6 rounded-lg @md:flex items-center gap-4 mb-2`}
      >
        {p.total > 0 ? (
          <TrendingUp size={40} className="size-8 sm:size-10 text-green" />
        ) : p.total < 0 ? (
          <TrendingDown size={40} className="size-8 sm:size-10 text-red" />
        ) : null}
        <div>
          <p className="sm:text-lg font-bold text-balance">
            {periods[idx].label} Savings & Investment Impact
          </p>
          <Usd classes="text-lg font-bold">{p.total}</Usd>
        </div>
        {p.total > 0 && (
          <Image
            src={laira.coin}
            width={70}
            className="@max-md:hidden ml-auto"
          />
        )}
      </div>
      {/* Tabs */}
      <TabGroup selectedIndex={idx} onChange={setIdx}>
        <TabList className="flex space-x-1 border-b border-gray-l2 mb-4">
          {periods.map((p) => (
            <Tab
              key={p.value}
              className={({ selected }) =>
                `flex-1 py-2.5 font-medium leading-5 focus:outline-none ${
                  selected
                    ? "border-b-2 border-blue text-blue-d1"
                    : "text-gray-d1 hover:text-blue-d1"
                }`
              }
            >
              {p.label}
            </Tab>
          ))}
        </TabList>

        {/* Table Panels */}
        <TabPanels>
          {periods.map((p) => {
            const x = v.projection[p.value - 1];
            return (
              <TabPanel key={p.value}>
                <div className="overflow-x-auto">
                  <table className="min-w-full [&_th,&_td]:p-2 [&_th,&_td]:text-left  [&_tbody]:divide-y [&_tbody]:divide-gray-l2 divide-y divide-gray-l2">
                    <thead>
                      <tr>
                        <th className="font-semibold">Account</th>
                        <th className="font-semibold">
                          {p.value === 1 ? "Allocation" : "Total Invested"}
                        </th>
                        <th className="font-semibold">
                          Year {p.value} Balance
                        </th>
                        <th className="font-semibold">Growth</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Savings Account (4%)</td>
                        <td>{toUsd(x.end.liq - x.liq)}</td>
                        <td>{toUsd(x.end.liq)}</td>
                        <td>{toUsd(x.liq)}</td>
                      </tr>
                      <tr>
                        <td>Sustainability Fund (20%)</td>
                        <td>{toUsd(x.end.lock - x.lock)}</td>
                        <td>{toUsd(x.end.lock)}</td>
                        <td>{toUsd(x.lock)}</td>
                      </tr>
                      <tr>
                        <td>Total</td>
                        <td>{toUsd(x.end.total - x.total)}</td>
                        <td>{toUsd(x.end.total)}</td>
                        <td>{toUsd(x.total)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabPanel>
            );
          })}
        </TabPanels>
      </TabGroup>
    </div>
  );
}
