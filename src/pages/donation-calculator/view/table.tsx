import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { toUsd } from "helpers/to-usd";
import type { View } from "./bg-view";

interface Props extends View {
  classes?: string;
}

export function Tables({ classes = "", ...v }: Props) {
  // Array of time periods
  const periods = ["Annual", "3-Year", "5-Year"];

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
          $27,163
        </p>
        <p className="text-sm font-body text-gray-d1">
          23% of donations automatically allocated
        </p>
      </div>

      {/* Tabs */}
      <TabGroup>
        <TabList className="flex space-x-1 border-b border-gray-l2 mb-4">
          {periods.map((p) => (
            <Tab
              key={p}
              className={({ selected }) =>
                `flex-1 py-2.5 text-sm font-body font-medium leading-5 focus:outline-none ${
                  selected
                    ? "border-b-2 border-blue text-blue-d1"
                    : "text-gray-d1 hover:text-blue-d1"
                }`
              }
            >
              {p}
            </Tab>
          ))}
        </TabList>

        {/* Table Panels */}
        <TabPanels>
          {periods.map((period, i) => {
            const y = i + 1;
            const x = v.projection[y];
            return (
              <TabPanel key={period}>
                <div className="overflow-x-auto">
                  <table className="min-w-full [&_th,&_td]:p-2 [&_th,&_td]:text-left text-sm">
                    <thead>
                      <tr>
                        <th>Account</th>
                        <th>{i === 0 ? "Allocation" : "Total Invested"}</th>
                        <th>Year {y} Balance</th>
                        <th>Growth</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>LIQUID</td>
                        <td>{toUsd(x.start.liq)}</td>
                        <td>{toUsd(x.end.liq)}</td>
                        <td>{toUsd(x.liq)}</td>
                      </tr>
                      <tr>
                        <td>LOCKED</td>
                        <td>{toUsd(x.start.lock)}</td>
                        <td>{toUsd(x.end.lock)}</td>
                        <td>{toUsd(x.lock)}</td>
                      </tr>
                      <tr>
                        <td>TOTAL</td>
                        <td>{toUsd(x.start.total)}</td>
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
