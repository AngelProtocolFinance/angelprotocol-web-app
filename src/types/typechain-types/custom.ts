/**
 * add types here that is not separately generated 
 *
 */
import { CharityApplications } from "./contracts/multisigs/CharityApplications";

export type DecodedApplicationProposal = Awaited<
  ReturnType<CharityApplications["functions"]["proposals"]>
>;
