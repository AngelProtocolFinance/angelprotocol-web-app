import type { FC } from "react";
import { useChainsQuery } from "services/apes";

type NetworkDropdownProps = {
  selectedNetwork: string;
  setSelectedNetwork: Function;
};

const NetworkDropdown: FC<NetworkDropdownProps> = ({
  selectedNetwork,
  setSelectedNetwork,
}) => {
  const { data: networks, isLoading } = useChainsQuery("");
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
        {isLoading ? (
          <option value="">Loading...</option>
        ) : (
          <>
            <option value="">Select a network...</option>
            {networks?.map((network) => (
              <option key={network.chain_id} value={network.chain_name}>
                {network.chain_name}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
};
export default NetworkDropdown;
