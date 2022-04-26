import { useLatestBlock } from "services/terra/queriers";
import Icon from "components/Icons/Icons";
import usePoller from "components/Transactors/Poller/usePoller";
import toCurrency from "helpers/toCurrency";
import Button from "../Button";
import PollSelector from "./PollSelector";
import { PollFilterOptions } from "./Polls";

export default function Toolbar(props: {
  pollFilter: PollFilterOptions;
  setPollFilter: React.Dispatch<React.SetStateAction<PollFilterOptions>>;
}) {
  const block_height = useLatestBlock();
  const showPoller = usePoller();

  return (
    <div className="flex items-center gap-2 mb-2 rounded-md">
      <p className="uppercase text-2xl font-bold text-white-grey mr-1">Polls</p>

      <PollSelector
        pollFilter={props.pollFilter}
        setPollFilter={props.setPollFilter}
      />

      <p className="ml-auto text-white-grey/80 font-heading text-sm flex items-center px-3">
        <span className="font-heading uppercase text-2xs">current block </span>
        <Icon type="Blockchain" className="mr-1" />
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
