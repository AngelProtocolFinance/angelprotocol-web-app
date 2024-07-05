import type { BigNumber } from "@ethersproject/bignumber";
import { EIPMethods } from "constants/evm";
import { erc20 } from "contracts/evm/ERC20";
import { condenseToNum, objToBase64, request } from "helpers";
import { getChain } from "helpers/tx/get-chain";
import type { QrTokenType, Token } from "types/aws";
import type { SupportedChainId } from "types/chain";
import type { CW20Balance } from "types/contracts";

type CosmosBalance = { balance: { denom: string; amount: string } };
export const tokenBalance = async (
  { decimals, token_id, type }: Token,
  chainID: SupportedChainId,
  holder: string
): Promise<number> => {
  const { nodeUrl } = await getChain(chainID);

  switch (type) {
    case "juno-native":
    case "osmosis-native":
    case "terra-native":
    case "stargaze-native":
    case "kujira-native":
    case "ibc": {
      return fetch(
        nodeUrl +
          `/cosmos/bank/v1beta1/balances/${holder}/by_denom?denom=${token_id}`
      )
        .then<CosmosBalance>((res) => res.json())
        .then((d) => condenseToNum(d.balance.amount, decimals));
    }
    case "cw20":
      return cw20Balance(token_id, holder, nodeUrl).then((bal) =>
        condenseToNum(bal, decimals)
      );

    case "erc20":
      return erc20Balance(token_id, holder, nodeUrl).then((bal) =>
        condenseToNum(bal, decimals)
      );

    case "evm-native": {
      return request({
        method: "eth_getBalance",
        params: [holder, "latest"],
        rpcURL: nodeUrl,
      }).then((hex) => condenseToNum(hex, decimals));
    }
    default: {
      const x = type satisfies QrTokenType;
      throw `should not fetch balance for ${x}: unsupported`;
    }
  }
};

async function cw20Balance(
  contract: string,
  address: string,
  lcd: string
): Promise<string> {
  return fetch(
    `${lcd}/cosmwasm/wasm/v1/contract/${contract}/smart/${objToBase64({
      balance: { address },
    })}`
  )
    .then<{ data: CW20Balance }>((res) => {
      if (!res.ok) throw new Error("failed to get cw20 balance");
      return res.json();
    })
    .then((result) => result.data.balance);
}

async function erc20Balance(
  tokenContract: string,
  walletAddress: string,
  rpcURL: string
) {
  const data = erc20.encodeFunctionData("balanceOf", [walletAddress]);
  const result = await request({
    method: EIPMethods.eth_call,
    params: [{ to: tokenContract, data }, "latest"],
    rpcURL,
  });
  const decoded: BigNumber = erc20.decodeFunctionResult("balanceOf", result)[0];
  return decoded.toString();
}
