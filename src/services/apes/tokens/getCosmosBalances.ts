import { Coin } from "@cosmjs/proto-signing";
import { utils } from "ethers";
import { Chain } from "types/server/aws";
import { isJunoChain } from "helpers/checkChain";
import getCosmosClient from "helpers/getCosmosClient";
import getTerraClient from "helpers/getTerraClient";

export default async function getCosmosBalances(
  chain: Chain,
  walletAddress: string
) {
  const nativeBalances = await getNativeCosmosBalances(chain, walletAddress);

  const cw20Balances = isJunoChain(chain.chain_id)
    ? await getJunoCW20Balances(chain, walletAddress)
    : await getTerraCW20Balances(chain, walletAddress);

  const allBalances = nativeBalances.concat(cw20Balances);

  const allCoins = [chain.native_currency, ...chain.tokens];

  allBalances.forEach((balance) => {
    const coin = allCoins.find((x) => x.token_id === balance.denom);
    coin!.balance = +utils.formatUnits(balance.amount, coin!.decimals);
  });

  return { data: chain };
}

/**
 * @param chain Chain
 * @param address wallet address
 * @returns non-zero native balances of coins/tokens approved for donation
 */
async function getNativeCosmosBalances(
  chain: Chain,
  address: string
): Promise<Coin[]> {
  const balancesRes = await fetch(
    chain.lcd_url + `/cosmos/bank/v1beta1/balances/${address}`
  );

  // returns only positive balances
  const { balances }: { balances: Coin[] } = await balancesRes.json();

  return balances.filter(
    (x) => !!chain.tokens.find((token) => token.token_id === x.denom)
  );
}

async function getJunoCW20Balances(
  chain: Chain,
  walletAddress: string
): Promise<Coin[]> {
  const junoClient = await getCosmosClient(chain.chain_id, chain.rpc_url);

  const cw20BalancePromises = chain.tokens
    .filter((x) => x.type === "cw20")
    .map((x) => junoClient.getBalance(walletAddress, x.token_id));

  const cw20Balances = await Promise.all(cw20BalancePromises);
  return cw20Balances;
}

async function getTerraCW20Balances(
  chain: Chain,
  walletAddress: string
): Promise<Coin[]> {
  const terraClient = getTerraClient(chain.chain_id, chain.rpc_url);

  const cw20BalancePromises = chain.tokens
    .filter((x) => x.type === "cw20")
    .map((x) =>
      terraClient.wasm
        .contractQuery<{ balance: string }>(x.token_id, {
          balance: { address: walletAddress },
        })
        .then((data) => ({
          denom: x.token_id,
          amount: data.balance,
        }))
    );

  const cw20Balances = await Promise.all(cw20BalancePromises);
  return cw20Balances;
}
