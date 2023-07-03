import { Interface } from "@ethersproject/abi";
import type { BigNumber } from "@ethersproject/bignumber";
import ERC20Abi from "abi/ERC20.json";
import { BalMap } from "./types";
import { FetchedChain, Token, TokenWithBalance } from "types/aws";
import { Coin } from "types/cosmos";
import { RequestArguments } from "types/evm";
import { queryContract } from "services/juno/queryContract";
import { condenseToNum } from "helpers";
import { contracts } from "constants/contracts";
import { EIPMethods } from "constants/evm";

type CosmosBalances = { balances: Coin[] };
type TokenType = "natives" | "alts";

export async function fetchBalances(
  chain: FetchedChain,
  address: string
): Promise<TokenWithBalance[]> {
  const tokens = segragate([chain.native_currency, ...chain.tokens]); //n,s
  if (chain.type === "juno-native" || chain.type === "terra-native") {
    const [natives, gifts, ...cw20s] = await Promise.allSettled([
      fetch(chain.lcd_url + `/cosmos/bank/v1beta1/balances/${address}`)
        .then<CosmosBalances>((res) => {
          if (!res.ok) throw new Error("failed to get native balances");
          return res.json();
        })
        //transform for easy access
        .then(({ balances }) => toMap(balances)),
      queryContract(
        "giftcardBalance",
        contracts.gift_cards,
        {
          addr: address,
        },
        chain.lcd_url
      ).then(({ native, cw20 }) =>
        toMap([
          ...native,
          ...cw20.map<Coin>(({ address, amount }) => ({
            denom: address,
            amount: amount,
          })),
        ])
      ),
      ...tokens.alts.map((x) =>
        queryContract(
          "cw20Balance",
          x.token_id,
          {
            addr: address,
          },
          chain.lcd_url
        ).then<Coin>((res) => ({ amount: res.balance, denom: x.token_id }))
      ),
    ]);

    const cw20map = toMap(
      cw20s.map<Coin>((result) =>
        result.status === "fulfilled" ? result.value : { amount: "", denom: "" }
      )
    );

    return tokens.natives
      .map((t) => ({
        ...t,
        balance: getBal(natives, t),
        gift: getBal(gifts, t),
      }))
      .concat(
        tokens.alts.map((t) => ({
          ...t,
          balance: getBal(cw20map, t),
          gift: getBal(gifts, t),
        }))
      );
  } else {
    /**fetch balances for ethereum */
    const native = tokens.natives[0]; //evm chains have only one gas token

    const [nativeBal, ...erc20s] = await Promise.allSettled([
      request(chain, {
        method: EIPMethods.eth_getBalance,
        params: [address, "latest"],
      }),
      ...tokens.alts.map((t) =>
        _erc20Balance(t, address, chain).then<Coin>((bal) => ({
          amount: bal,
          denom: t.token_id,
        }))
      ),
    ]);

    const erc20map = toMap(
      erc20s.map<Coin>((result) =>
        result.status === "fulfilled" ? result.value : { amount: "", denom: "" }
      )
    );

    return [
      {
        ...native,
        balance: condenseToNum(
          nativeBal.status === "fulfilled" ? nativeBal.value : "0",
          native.decimals
        ),
      },
    ].concat(
      tokens.alts.map((t) => ({
        ...t,
        balance: getBal(erc20map, t),
      }))
    );
  }
}

function segragate(tokens: Token[]): { [key in TokenType]: Token[] } {
  return tokens.reduce((result, token) => {
    const type: TokenType =
      token.type === "ibc" || token.type.includes("native")
        ? "natives"
        : "alts";
    result["alts"] ||= []; //init alts all the same
    result[type] ||= [];
    result[type].push(token);
    return result;
  }, {} as any);
}

function toMap(coins: Coin[]): BalMap {
  return Object.entries(coins).reduce(
    (result, [, { denom, amount }]) => ({
      ...result,
      [denom]: amount,
    }),
    {}
  );
}
function getBal(
  map: PromiseSettledResult<BalMap> | BalMap,
  { token_id, decimals }: Token
): number {
  if (isPromise(map)) {
    if (map.status === "rejected") return 0;
    return extract(map.value[token_id], decimals);
  }
  return extract(map[token_id], decimals);
}

function extract(val: BalMap[keyof BalMap], decimals: number) {
  return typeof val === "number" ? val : condenseToNum(val || "0", decimals);
}

function isPromise<T>(val: any): val is PromiseSettledResult<T> {
  const key: keyof PromiseSettledResult<any> = "status";
  return key in val;
}

type Result = { result: string } | { error: { code: number; message: string } };

async function request(
  chain: FetchedChain,
  { method, params }: RequestArguments
) {
  const result = await fetch(chain.rpc_url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method,
      params,
    }),
  }).then<Result>((res) => {
    if (!res.ok) throw new Error(`Failed request ${method}`);
    return res.json();
  });

  if ("error" in result) throw new Error(result.error.message);

  return result.result;
}

async function _erc20Balance(
  token: Token,
  address: string,
  chain: FetchedChain
) {
  const erc20 = new Interface(ERC20Abi);
  const data = erc20.encodeFunctionData("balanceOf", [address]);

  const result = await request(chain, {
    method: EIPMethods.eth_call,
    params: [
      {
        to: token.token_id,
        data,
      },
      "latest",
    ],
  });

  const decoded: BigNumber = erc20.decodeFunctionResult("balanceOf", result)[0];

  return decoded.toString();
}
