import { Interface } from "@ethersproject/abi";
import events from "./events.json";
import queries from "./queries.json";
import txs from "./txs.json";

export const multisig = new Interface([...txs, ...queries, ...events]);
export const SubmissionEvent = multisig.getEvent("Submission");
export const ExecutionFailureEvent = multisig.getEvent("ExecutionFailure");
