import AppHead from "components/Headers/AppHead";
import Liquid from "./Liquid";
import Locked from "./Locked";

export default function Withdraw() {
  return (
    <section className="pb-16 grid content-start h-screen text-white-grey font-heading">
      <AppHead />
      <div className="mx-auto">
        <h2 className="pt-8 pl-5 uppercase text-white-grey text-lg font-bold">
          Total Balance: $5,023
        </h2>
        <div className="flex items-stretch mx-4">
          <div className="flex-1 pl-1 pr-1">
            <div className="block bg-leaf-green overflow-hidden h-full rounded-lg">
              <div className="p-4">
                <h3 className="mb-2 text-lg font-bold uppercase">
                  Liquid Account
                </h3>
                <p className="text-6xl font-bold">$1,023</p>
                <table className="table-auto mt-4">
                  <thead>
                    <tr className="text-lg text-left">
                      <th className="pr-2">Strategy</th>
                      <th>Allocation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="pr-2">Anchor Protocol</td>
                      <td>60%</td>
                    </tr>
                    <tr>
                      <td className="pr-2">Option 2</td>
                      <td>40%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="flex-1 pl-1 pr-1">
            <div className="block bg-angel-orange overflow-hidden h-full rounded-lg">
              <div className="p-4">
                <h3 className="mb-2 text-lg font-bold uppercase">
                  Locked Account
                </h3>
                <h3 className="text-6xl font-bold">$4,000</h3>
                <table className="table-auto mt-4">
                  <thead>
                    <tr className="text-lg text-left">
                      <th className="pr-2">Strategy</th>
                      <th>Allocation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="pr-2">Anchor Protocol</td>
                      <td>100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-8 padded-container uppercase text-white-grey text-3xl font-bold">
        <Liquid />
        <Locked />
      </div>
    </section>
  );
}
