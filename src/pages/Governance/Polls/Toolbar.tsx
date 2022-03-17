import { SiHiveBlockchain } from "react-icons/si";
import usePoller from "components/Transactors/Poller/usePoller";
import { useLatestBlock } from "services/terra/queriers";
import toCurrency from "helpers/toCurrency";
import Button from "../Button";
import { PollFilterOptions } from "./Polls";
import PollSelector from "./PollSelector";

export default function Toolbar(props: {
  pollFilter: PollFilterOptions;
  setPollFilter: React.Dispatch<React.SetStateAction<PollFilterOptions>>;
}) {
  const block_height = useLatestBlock();
  const showPoller = usePoller();

  return (
    <div className="flex items-center gap-2 border border-white/10 px-6 py-2 mb-3 bg-white/10 shadow-md rounded-md">
      <p className="uppercase text-2xl font-bold text-white-grey mr-1">Polls</p>

      <PollSelector
        pollFilter={props.pollFilter}
        setPollFilter={props.setPollFilter}
      />

      <p className="ml-auto text-white-grey text-opacity-80 font-heading text-sm flex items-center px-3">
        <span className="font-heading uppercase text-2xs">current block </span>
        <SiHiveBlockchain className="mr-1" />
        <span>{toCurrency(+block_height, 0)}</span>
      </p>

      <Button
        onClick={() => {
          window.open(
            "https://forum.angelprotocol.io",
            "_blank",
            "noopener noreferrer"
          );
        }}
      >
        Join Forum
      </Button>
      <Button title="Create Poll" onClick={showPoller}>
        Create Poll
      </Button>
    </div>
  );
}
