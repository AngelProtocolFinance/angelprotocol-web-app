import { Coin } from "@cosmjs/proto-signing";
import { FetchedChain, Token, TokenWithBalance } from "types/aws";
import { CW20Balance } from "types/contracts";
import { ProviderId } from "types/lists";
import { balance } from "contracts/evm/ERC20";
import { condenseToNum, getProvider, toBase64 } from "helpers";
import { queryContract } from "../../contract/queryContract";

type BalMap = { [index: string]: string | undefined | number };
type CosmosBalances = { balances: Coin[] };
type TokenType = "natives" | "alts";

export async function fetchBalances(
  chain: FetchedChain,
  address: string,
  providerId: ProviderId
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
        "gift-card.balance",
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
        cw20Balance(x.token_id, address, chain.lcd_url).then<Coin>((res) => ({
          amount: res,
          denom: x.token_id,
        }))
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
    const provider = getProvider(providerId)!;

    const [nativeBal, ...erc20s] = await Promise.allSettled([
      provider.request<string>({
        method: "eth_getBalance",
        params: [address, "latest"],
      }),
      ...tokens.alts.map((t) =>
        provider
          .request<string>({
            method: "eth_call",
            params: [{ to: t.token_id, data: balance.encode(address) }],
          })
          .then<Coin>((result) => ({
            amount: balance.decode(result),
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

async function cw20Balance(
  contract: string,
  address: string,
  lcd: string
): Promise<string> {
  return fetch(
    `${lcd}/cosmwasm/wasm/v1/contract/${contract}/smart/${toBase64({
      balance: { address },
    })}`
  )
    .then<{ data: CW20Balance }>((res) => {
      if (!res.ok) throw new Error("failed to get cw20 balance");
      return res.json();
    })
    .then((result) => result.data.balance);
}
