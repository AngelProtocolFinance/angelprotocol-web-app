declare module "@types-page/governance" {
  import { PollStatus } from "@types-server/contracts";
  type PollFilterOptions = PollStatus | "all";
}
