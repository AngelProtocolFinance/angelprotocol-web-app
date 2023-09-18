import { subgraph } from "./subgraph";

export default subgraph;

export const {
  useProposalsQuery,
  useProposalQuery,
  useLazyProposalsQuery,
  useApplicationProposalQuery,
  util: {
    updateQueryData: updateSubgraphQueryData,
    invalidateTags: invalidateSubgraphTags,
  },
} = subgraph;

export * from "./tags";
