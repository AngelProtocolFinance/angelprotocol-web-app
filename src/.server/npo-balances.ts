import type { Balance } from "@better-giving/balance";
import { tables } from "@better-giving/types/list";
import type { NpoBalances } from "types/npo-balance";
import { GetCommand, apes } from "./aws/db";
import { env } from "./env";

export const npoBalances = async (npoId: number): Promise<NpoBalances> => {
  const result = await apes.send(
    new GetCommand({
      TableName: tables.balances,
      Key: {
        id: npoId,
        network: env,
      } satisfies Balance.PrimaryKey,
    })
  );
  const balance = result.Item as Balance.DBRecord | undefined;

  if (!balance) {
    return {
      contributionsCount: 0,
      donationsBal: 0,
      payoutsMade: 0,
      payoutsPending: 0,
      sustainabilityFundBal: 0,
      totalContributions: 0,
      totalBaseFees: 0,
      totalFiscalSponsorFees: 0,
      totalProcessingFees: 0,
      payoutsMadeDonation: 0,
      payoutsMadeGrant: 0,
      totalGrantsEarned: 0,
      totalContributionsViaMarketplace: 0,
      totalContributionsViaWidget: 0,
      totalTips: 0,
    };
  }

  // `id` and `network` are DB keys
  const { id, network, ...rest } = balance;

  const data: NpoBalances =
    rest.version === 2
      ? rest
      : {
          ...rest,
          totalTips: 0,
          totalBaseFees: 0,
          totalFiscalSponsorFees: 0,
          totalProcessingFees: 0,
          totalContributionsViaMarketplace: 0,
          totalContributionsViaWidget: 0,
        };
  return data;
};
