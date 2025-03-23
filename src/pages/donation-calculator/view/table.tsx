import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { toUsd } from "helpers/to-usd";
import type { View } from "./bg-view";

interface Props extends View {
  classes?: string;
}

export function Tables({ classes = "", ...v }: Props) {
  // Array of time periods
  const periods = [
    { label: "1 Year", value: 1 },
    { label: "3 Years", value: 3 },
    { label: "5 Years", value: 5 },
  ];

  return (
    <div className={`${classes} bg-white rounded-lg shadow-sm p-6`}>
      {/* Header */}
      <h2 className="text-lg font-heading font-medium text-gray-d2 mb-4">
        Investment Growth Projections
      </h2>

      {/* Highlight Section */}
      <div className="bg-green-l4 rounded-lg p-4 mb-4">
        <p className="text-2xl font-heading font-bold text-green-d2">
          Better Giving Annual
        </p>
        <p className="text-4xl font-heading font-bold text-green-d2 mb-2">
          {toUsd(v.notGranted)}
        </p>
        <p className="text-sm font-body text-gray-d1">
          {(v.notGrantedRate * 100).toFixed(2)}% of donations automatically
          allocated
        </p>
      </div>

      {/* Tabs */}
      <TabGroup>
        <TabList className="flex space-x-1 border-b border-gray-l2 mb-4">
          {periods.map((p) => (
            <Tab
              key={p.value}
              className={({ selected }) =>
                `flex-1 py-2.5 text-sm font-medium leading-5 focus:outline-none ${
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
                  <table className="min-w-full [&_th,&_td]:p-2 [&_th,&_td]:text-left text-sm  [&_tbody]:divide-y [&_tbody]:divide-gray-l2 divide-y divide-gray-l2">
                    <thead>
                      <tr>
                        <th>Account</th>
                        <th>
                          {p.value === 1 ? "Allocation" : "Total Invested"}
                        </th>
                        <th>Year {p.value} Balance</th>
                        <th>Growth</th>
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
