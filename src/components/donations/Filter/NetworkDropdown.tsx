import type { FC } from "react";
import { BaseChain } from "types/aws";

type NetworkDropdownProps = {
  selectedNetwork: string;
  setSelectedNetwork: Function;
  networks: BaseChain[] | undefined;
};

const NetworkDropdown: FC<NetworkDropdownProps> = ({
  selectedNetwork,
  setSelectedNetwork,
  networks,
}) => {
  return (
    <div className="flex flex-col text-gray-d2 gap-2">
      <label className="dark:text-white">Network</label>
      <select
        value={selectedNetwork}
        onChange={(e) => setSelectedNetwork(e.target.value)}
        className={
          "inline-flex w-full justify-between items-center border border-gray-l2 dark:border-bluegray rounded-sm p-3 dark:text-gray dark:bg-blue-d6 dark:placeholder:text-gray"
        }
      >
        <option value="">Select a network...</option>
        {networks?.map((network) => (
          <option key={network.chain_id} value={network.chain_name}>
            {network.chain_name}
          </option>
        ))}
      </select>
    </div>
  );
};
export default NetworkDropdown;
