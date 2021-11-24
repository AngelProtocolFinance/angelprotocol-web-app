import maskAddress from "helpers/maskAddress";
import { IoClose } from "react-icons/io5";

const mockAddressList: string[] = [
  "terra15dwd5mj8v59wpj0wvt233mf5efdff808c5tkal",
  "terra15dwd5mj8v59wpj0wvt233mf5efdff808c5tkal",
  "terra15dwd5mj8v59wpj0wvt233mf5efdff808c5tkal",
];

function AddressSelector() {
  return (
    <table className="min-w-full leading-normal my-5">
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Fund Members
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
        </tr>
      </thead>
      <tbody>
        {mockAddressList.map((address: string) => (
          <tr>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <span className="text-normal font-sans text-left">
                {maskAddress(address)}
              </span>
            </td>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100">
              <button
                type="button"
                className="inline-block text-gray-500 hover:text-gray-700"
              >
                <IoClose />
              </button>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AddressSelector;
