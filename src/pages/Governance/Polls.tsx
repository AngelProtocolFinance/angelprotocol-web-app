import { useLatestBlock } from "services/terra/queriers";
import { useGovPolls } from "services/terra/gov/queriers";
import Poll from "./Poll";
import { SiHiveBlockchain } from "react-icons/si";
import toCurrency from "helpers/toCurrency";
import usePoller from "components/Transactors/Poller/usePoller";
import Action from "./Action";

export default function Polls() {
  const block_height = useLatestBlock();
  const gov_polls = useGovPolls();
  const showPoller = usePoller();

  return (
    <div className="mt-4">
      <div className="border border-opacity-10 px-6 py-2 bg-white bg-opacity-10 shadow-md rounded-md flex items-center mb-3">
        <p className="uppercase text-2xl font-bold text-white-grey mr-4">
          Polls
        </p>
        <p className="ml-auto text-white-grey text-opacity-80 font-heading text-sm flex items-center mr-2 px-3">
          <span className="font-heading uppercase text-2xs mr-2">
            current block{" "}
          </span>
          <SiHiveBlockchain className="mr-1" />
          <span>{toCurrency(+block_height, 0)}</span>
        </p>
        <div className="flex flex-wrap gap-2 justify-end self-end">
          <Action
            title="Join Forum"
            action={() => {
              window.open(
                "https://forum.angelprotocol.io",
                "_blank",
                "noopener noreferrer"
              );
            }}
          />
          <Action title="Create Poll" action={showPoller} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {gov_polls.map((poll) => (
          <Poll key={poll.id} poll_id={poll.id} />
        ))}
      </div>
    </div>
  );
}
