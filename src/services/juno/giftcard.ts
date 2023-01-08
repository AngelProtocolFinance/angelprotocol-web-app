import { utils } from "ethers";
import { Args, Res, Result } from "./queryContract/types";
import { Token } from "types/aws";
import { UnexpectedStateError } from "errors/errors";
import { contracts } from "constants/contracts";
import { junoApi } from ".";
import { genQueryPath } from "./queryContract/genQueryPath";
import { customTags, junoTags } from "./tags";

export const giftcardApi = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    giftcardBalance: builder.query<
      Result<"giftcardBalance">,
      Args<"giftcardBalance"> & { supportedTokens: Token[] }
    >({
      providesTags: [{ type: junoTags.custom, id: customTags.giftcard }],
      query: (args) =>
        genQueryPath("giftcardBalance", args, contracts.gift_cards),
      transformResponse: (res: Res<"giftcardBalance">, _, args) => {
        function toToken(denom: string, amount: string) {
          const token = args.supportedTokens.find((t) => t.token_id === denom);

          if (!token) {
            throw new UnexpectedStateError(
              `Giftcard contains unsupported token: ${denom}`
            );
          }

          const result: Token = {
            ...token,
            balance: +utils.formatUnits(amount, token.decimals),
          };

          return result;
        }

        const balances: Token[] = res.data.cw20
          .map((cw20) => toToken(cw20.address, cw20.amount))
          .concat(
            res.data.native.map((native) =>
              toToken(native.denom, native.amount)
            )
          );

        return balances;
      },
    }),
  }),
});

export const { useGiftcardBalanceQuery } = giftcardApi;
