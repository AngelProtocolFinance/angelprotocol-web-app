import { TxRaw } from "@keplr-wallet/proto-types/cosmos/tx/v1beta1/tx";
import { Keplr } from "@keplr-wallet/types";
import { ProviderId } from "contexts/WalletContext/types";
import {
  KeplrWC,
  SignDoc,
  WCSignAminoRes,
  WCSignDirectRes,
} from "types/cosmos";
import { Dwindow } from "types/ethereum";
import { session as _session, signClient } from "./wallet-connect";

export async function keplr(providerId: ProviderId): Promise<Keplr | KeplrWC> {
  return providerId === "keplr-wc" ? keplrWC() : (window as Dwindow).keplr!;
}

export async function keplrWC(): Promise<KeplrWC> {
  const client = await signClient();
  const session = _session("Keplr", client);

  if (!session) throw new Error("@dev: no keplr session");

  return {
    async signDirect(chain_id, signer, doc: SignDoc) {
      //doc is from cosmos/types SignDoc
      const tx = TxRaw.fromPartial({
        bodyBytes: doc.bodyBytes,
        authInfoBytes: doc.authInfoBytes,
      });
      const { authInfoBytes, bodyBytes } = TxRaw.toJSON(tx) as any;
      const { signature } = await client
        .request<WCSignDirectRes>({
          topic: session.topic,
          chainId: `cosmos:${chain_id}`,
          request: {
            method: "cosmos_signDirect",
            params: {
              signerAddress: signer,
              signDoc: {
                authInfoBytes,
                bodyBytes,
                chainId: doc.chainId,
                accountNumber: doc.accountNumber?.toString(),
              },
            },
          },
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
      return { signature, signed: doc };
    },
    async signAmino(signer, chainId, doc) {
      const { signature } = await client.request<WCSignAminoRes>({
        topic: session.topic,
        chainId,
        request: {
          method: "cosmos_signAmino",
          params: { signerAddress: signer, signDoc: doc },
        },
      });

      return { signature, signed: doc };
    },
  };
}
