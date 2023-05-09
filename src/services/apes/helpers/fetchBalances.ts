import { Coin } from "@cosmjs/proto-signing";
import { FetchedChain, Token } from "types/aws";
import { CW20Balance } from "types/contracts";
import { ProviderId } from "types/lists";
import { TokenWithBalance } from "types/tx";
import giftIcon from "assets/icons/currencies/gift.svg";
import { queryContract } from "services/juno/queryContract";
import { condenseToNum, getProvider, toBase64 } from "helpers";

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
    const [natives, ...cw20s] = await Promise.allSettled([
      fetch(chain.lcd_url + `/cosmos/bank/v1beta1/balances/${address}`)
        .then<CosmosBalances>((res) => {
          if (!res.ok) throw new Error("failed to get native balances");
          return res.json();
        })
        //transform for easy access
        .then(({ balances }) => toMap(balances)),

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
      }))
      .concat(
        tokens.alts.map((t) => ({
          ...t,
          balance: getBal(cw20map, t),
        }))
      );
  } else {
    /**fetch balances for ethereum */
    const native = tokens.natives[0]; //evm chains have only one gas token
    const provider = getProvider(providerId)!;

    const [nativeBal, gift, ...erc20s] = await Promise.allSettled([
      provider.request<string>({
        method: "eth_getBalance",
        params: [address, "latest"],
      }),
      queryContract("gift-card.balance", { addr: address }),

      ...tokens.alts.map((t) =>
        queryContract("erc20.balance", {
          erc20: t.token_id,
          addr: address,
        }).then<Coin>((result) => ({
          amount: result,
          denom: t.token_id,
        }))
      ),
    ]);

    const erc20map = toMap(
      erc20s.map<Coin>((result) =>
        result.status === "fulfilled" ? result.value : { amount: "", denom: "" }
      )
    );

    let gifts: TokenWithBalance[] = [];
    if (gift.status === "fulfilled") {
      const { native, ...erc20s } = gift.value;
      if (native !== "0") {
        gifts.push({
          ...chain.native_currency,
          type: "evm-native-gift",
          logo: giftIcon,
          balance: condenseToNum(native, chain.native_currency.decimals),
        });
      }
      for (const t of chain.tokens) {
        if (t.token_id in erc20s) {
          gifts.push({
            ...t,
            type: "erc20-gift",
            logo: giftIcon,
            balance: condenseToNum(erc20s[t.token_id], t.decimals),
          });
        }
      }
    }

    return [
      {
        ...native,
        balance: condenseToNum(
          nativeBal.status === "fulfilled" ? nativeBal.value : "0",
          native.decimals
        ),
      },
      ...tokens.alts.map((t) => ({
        ...t,
        balance: getBal(erc20map, t),
      })),
      ...gifts,
    ];
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
