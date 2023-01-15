import { JsonRpcProvider } from "@ethersproject/providers";
import { formatUnits } from "@ethersproject/units";
import { BalMap } from "./types";
import { TokenWithBalance } from "services/types";
import { FetchedChain, Token } from "types/aws";
import { Coin } from "types/cosmos";
import { queryContract } from "services/juno/queryContract";
import { condenseToNum } from "helpers";
import { chains } from "constants/chains";
import { contracts } from "constants/contracts";
import { getERC20Holdings } from "./getERC20Holdings";

type CosmosBalances = { balances: Coin[] };
type TokenType = "natives" | "alts";

export async function fetchBalances(
  _chain: FetchedChain,
  address: string
): Promise<TokenWithBalance[]> {
  const chain = chains[_chain.chain_id];
  const tokens = segragate([_chain.native_currency, ..._chain.tokens]); //n,s
  if (chain.type === "cosmos" || chain.type === "terra") {
    const [natives, gifts, ...cw20s] = await Promise.allSettled([
      fetch(chain.lcd + `/cosmos/bank/v1beta1/balances/${address}`)
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
        chain.lcd
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
          chain.lcd
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
    const jsonProvider = new JsonRpcProvider(chain.rpc);
    const [nativeBal, erc20s] = await Promise.allSettled([
      jsonProvider.getBalance(address),
      getERC20Holdings(chain.rpc, address, tokens.alts),
    ]);

    return [
      {
        ...native,
        balance: +formatUnits(
          nativeBal.status === "fulfilled" ? nativeBal.value : "0",
          native.decimals
        ),
      },
    ].concat(
      tokens.alts.map((t) => ({
        ...t,
        balance: getBal(erc20s, t),
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
