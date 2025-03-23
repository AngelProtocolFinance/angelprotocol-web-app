import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import type { View } from "./bg-view";

interface Props extends View {
  classes?: string;
}
export function Tables({ classes = "" }: Props) {
  // Data for the table
  const data = [
    {
      account: "Savings Account (4%)",
      allocation: "$0",
      yearEnd3: "$0",
      yearEnd5: "$0",
    },
    {
      account: "Sustainability Fund (20%)",
      allocation: "$27,163",
      yearEnd3: "$33,175",
      yearEnd5: "$6,012",
    },
  ];

  // Total row
  const total = {
    allocation: "$27,163",
    yearEnd3: "$33,175",
    yearEnd5: "$6,012",
  };

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
          <Tab
            className={({ selected }) =>
              `w-1/3 py-2.5 text-sm font-body font-medium leading-5 focus:outline-none ${
                selected
                  ? "border-b-2 border-blue text-blue-d1"
                  : "text-gray-d1 hover:text-blue-d1"
              }`
            }
          >
            Annual
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-1/3 py-2.5 text-sm font-body font-medium leading-5 focus:outline-none ${
                selected
                  ? "border-b-2 border-blue text-blue-d1"
                  : "text-gray-d1 hover:text-blue-d1"
              }`
            }
          >
            3-Year
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-1/3 py-2.5 text-sm font-body font-medium leading-5 focus:outline-none ${
                selected
                  ? "border-b-2 border-blue text-blue-d1"
                  : "text-gray-d1 hover:text-blue-d1"
              }`
            }
          >
            5-Year
          </Tab>
        </TabList>

        {/* Table */}
        <TabPanels>
          {/* We can reuse the same panel since the data changes are minimal */}
          <TabPanel>
            <div className="overflow-x-auto">
              <table className="min-w-full [&_th,&_td]:p-2 text-sm">
                <thead>
                  <tr>
                    <th>Account</th>
                    <th>Allocation</th>
                    <th>Year-End Balance</th>
                    <th>Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index} className="border-t border-gray-l3">
                      <td>{row.account}</td>
                      <td>{row.allocation}</td>
                      <td>{index === 0 ? row.yearEnd3 : row.yearEnd3}</td>
                      <td>{index === 0 ? row.yearEnd5 : row.yearEnd5}</td>
                    </tr>
                  ))}
                  {/* Total Row */}
                  <tr className="border-t border-gray-l3 [&_td]:font-bold">
                    <td>TOTAL</td>
                    <td>{total.allocation}</td>
                    <td>{total.yearEnd3}</td>
                    <td>{total.yearEnd5}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabPanel>
          {/* Add other TabPanels if data changes per tab */}
          <TabPanel>
            {/* Same table structure, update data as needed */}
          </TabPanel>
          <TabPanel>
            {/* Same table structure, update data as needed */}
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
