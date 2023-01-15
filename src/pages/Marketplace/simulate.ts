import Long from "long";
import {
  JSONAccount,
  JUNO_LCD,
  base64FromBytes,
  bytesFromBase64,
  typeURLs,
} from "./types";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import { PubKey } from "cosmjs-types/cosmos/crypto/secp256k1/keys";
import { SignMode } from "cosmjs-types/cosmos/tx/signing/v1beta1/signing";
import { SimulateRequest } from "cosmjs-types/cosmos/tx/v1beta1/service";
import {
  AuthInfo,
  SignerInfo,
  Tx,
  TxBody,
  TxRaw,
} from "cosmjs-types/cosmos/tx/v1beta1/tx";
import "cosmjs-types/tendermint/abci/types";
import { Dwindow } from "types/window";
import { ap_wallets } from "constants/ap_wallets";
import { chainIds } from "constants/chains";

const keplr = (window as Dwindow).keplr!;

export async function simulate() {
  const key = await keplr.getKey(chainIds.juno);
  const address = key.bech32Address;

  const { account } = await fetch(
    JUNO_LCD + `/cosmos/auth/v1beta1/accounts/${address}`
  ).then<{ account: JSONAccount }>((res) => res.json());

  const pub = PubKey.fromJSON({ key: account.pub_key.key });

  const signer: SignerInfo = {
    publicKey: {
      typeUrl: account.pub_key["@type"],
      value: PubKey.encode(pub).finish(),
    },
    modeInfo: { single: { mode: SignMode.SIGN_MODE_LEGACY_AMINO_JSON } },
    sequence: Long.fromString(account.sequence),
  };

  const txBody: TxBody = {
    messages: [
      {
        typeUrl: typeURLs.sendNative,
        value: MsgSend.encode({
          fromAddress: address,
          toAddress: ap_wallets.juno_deposit,
          amount: [{ amount: "1000", denom: "ujunox" }],
        }).finish(),
      },
    ],
    memo: "",
    extensionOptions: [],
    nonCriticalExtensionOptions: [],
    timeoutHeight: Long.fromString("0"),
  };

  const authInfo: AuthInfo = {
    signerInfos: [signer],
    fee: {
      amount: [],
      gasLimit: Long.fromString("0"),
      granter: "",
      payer: address,
    },
  };

  const txRaw: TxRaw = {
    bodyBytes: TxBody.encode(txBody).finish(),
    authInfoBytes: AuthInfo.encode(authInfo).finish(),
    signatures: [bytesFromBase64("")],
  };

  const result = await fetch(JUNO_LCD + "/cosmos/tx/v1beta1/simulate", {
    method: "POST",
    body: JSON.stringify({
      tx_bytes: base64FromBytes(TxRaw.encode(txRaw).finish()),
    }),
  }).then((res) => res.json());

  console.log(result);
}

export function decodeTx() {
  const tx = Tx.decode(
    bytesFromBase64(
      "Co8BCowBChwvY29zbW9zLmJhbmsudjFiZXRhMS5Nc2dTZW5kEmwKLHRlcnJhMXRjMnlwMDdwY2U5M3V3bm5lcXIwY3B0cXplNmx2a2U5ZWRhbDNsEix0ZXJyYTE3d3AyZHI3enJzcnJ0bHo5Y240c3h0cHNoYTM3ZHdtd21zZjYwchoOCgV1bHVuYRIFMTAwMDASMAosCiEKHy9jb3Ntb3MuY3J5cHRvLnNlY3AyNTZrMS5QdWJLZXkSBAoCCAEYgwESABoA"
    )
  );

  const request = SimulateRequest.fromJSON({
    tx: undefined,
    txBytes:
      "12e7010a8e010a8b010a1c2f636f736d6f732e62616e6b2e763162657461312e4d736753656e64126b0a2b6a756e6f31387070793572637532343038717974766c38726c67786a716137726a613978736c7538763673122b6a756e6f31377770326472377a72737272746c7a39636e3473787470736861333764776d7774787370326c1a0f0a06756a756e6f781205313030303012520a4e0a460a1f2f636f736d6f732e63727970746f2e736563703235366b312e5075624b657912230a2102072215e552bd08267bfab93c991b9e1a3b40c2701f6d9ab55df411e0e8798c5512020a00180e12001a00",
  });

  const _tx = Tx.decode(request.txBytes);

  console.log(_tx);
}

/**
 * 
 * {jsonrpc: "2.0", id: 584866839174, method: "abci_query",…}
id
: 
584866839174
jsonrpc
: 
"2.0"
method
: 
"abci_query"
params
: 
{path: "/cosmos.tx.v1beta1.Service/Simulate",…}
data
: 
"12e7010a8e010a8b010a1c2f636f736d6f732e62616e6b2e763162657461312e4d736753656e64126b0a2b6a756e6f31387070793572637532343038717974766c38726c67786a716137726a613978736c7538763673122b6a756e6f31377770326472377a72737272746c7a39636e3473787470736861333764776d7774787370326c1a0f0a06756a756e6f781205313030303012520a4e0a460a1f2f636f736d6f732e63727970746f2e736563703235366b312e5075624b657912230a2102072215e552bd08267bfab93c991b9e1a3b40c2701f6d9ab55df411e0e8798c5512020a00180e12001a00"
path
: 
"/cosmos.tx.v1beta1.Service/Simulate"
prove
: 
false
 */
