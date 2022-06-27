import { TransactionRequest } from "@ethersproject/abstract-provider/src.ts";
import { Coin, CreateTxOptions, MsgSend } from "@terra-money/terra.js";
import ERC20Abi from "abi/ERC20.json";
import Decimal from "decimal.js";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { DonateValues } from "./types";
import {
  EncodeObject,
  SigningCosmWasmClient,
  Tx,
} from "types/third-party/cosmjs";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import { useSetter } from "store/accessors";
import {
  setFee,
  setFormError,
  setFormLoading,
} from "slices/transaction/transactionSlice";
import Account from "contracts/Account";
import CW20 from "contracts/CW20";
import Contract from "contracts/Contract";
import Indexfund from "contracts/IndexFund";
import useDebouncer from "hooks/useDebouncer";
import extractFeeNum from "helpers/extractFeeNum";
import { getProvider } from "helpers/getProvider";
import { getCosmosClient, getFee, getFeeNum } from "helpers/third-party/cosmjs";
import { ap_wallets } from "constants/ap_wallets";
import { denoms } from "constants/currency";

let client: SigningCosmWasmClient;

export default function useEstimator() {
  const dispatch = useSetter();
  const {
    watch,
    setError,
    getValues,
    formState: { isValid, isDirty },
  } = useFormContext<DonateValues>();
  const { wallet } = useGetWallet();

  const amount = Number(watch("amount")) || 0;
  const split_liq = Number(watch("split_liq"));
  const selectedToken = watch("token");

  const [evmTx, setEVMtx] = useState<TransactionRequest>();
  const [terraTx, setTerraTx] = useState<CreateTxOptions>();
  const [cosmosTx, setCosmosTx] = useState<Tx>();

  const [debounced_amount] = useDebouncer(amount, 500);
  const [debounced_split] = useDebouncer(split_liq, 500);

  useEffect(() => {
    (async () => {
      try {
        if (!wallet) {
          dispatch(setFormError("Wallet is not connected"));
          return;
        }

        if (!isValid || !isDirty) return;

        if (!debounced_amount) {
          dispatch(setFee(0));
          return;
        }

        if (debounced_amount > +selectedToken.balance) {
          setError("amount", { message: "not enough balance" });
          return;
        }

        dispatch(setFormLoading(true));

        /** keplr transaction */
        if (selectedToken.type === "cosmos-native") {
          if (!client) client = await getCosmosClient();
          const receiver = getValues("receiver");
          let msg: EncodeObject;
          if (typeof receiver === "undefined" || typeof receiver === "number") {
            const index_fund = new Indexfund(wallet.address, receiver);
            msg = await index_fund.createDepositMsg(
              debounced_amount,
              debounced_split
            );
          } else {
            const account = new Account(receiver, wallet.address);
            msg = await account.createDepositMsg(
              debounced_amount,
              debounced_split
            );
          }

          const gas = await client.simulate(wallet.address, [msg], undefined);
          const fee = getFee(gas);
          const numFee = getFeeNum(fee);

          if (debounced_amount + numFee >= wallet.displayCoin.balance) {
            setError("amount", {
              message: "not enough balance to pay for fees",
            });
            return;
          }
          dispatch(setFee(numFee));
          setCosmosTx({ msgs: [msg], fee });
        }

        /** terra native transaction, send or contract interaction */
        if (selectedToken.type === "terra-native") {
          const contract = new Contract(wallet.address);
          const receiver = ap_wallets.terra;
          const amount = new Decimal(debounced_amount).mul(1e6);

          const msg = new MsgSend(wallet.address, receiver, [
            new Coin(denoms.uluna, amount.toNumber()),
          ]);
          const aminoFee = await contract.estimateFee([msg]);
          const numFee = extractFeeNum(aminoFee);

          if (debounced_amount + numFee >= wallet.displayCoin.balance) {
            setError("amount", {
              message: "not enough balance to pay for fees",
            });
            return;
          }
          dispatch(setFee(numFee));
          setTerraTx({ msgs: [msg], fee: aminoFee });
        }

        /** terra cw20 transaction */
        if (selectedToken.type === "cw20") {
          const contract = new CW20(
            selectedToken.contract_addr,
            wallet.address
          );
          const msg = contract.createTransferMsg(
            debounced_amount,
            ap_wallets.terra
          );
          const aminoFee = await contract.estimateFee([msg]);
          const numFee = extractFeeNum(aminoFee);

          if (
            numFee >=
            wallet.displayCoin
              .balance /** displayCoin is native - for payment of fee */
          ) {
            setError("amount", {
              message: "not enough balance to pay for fees",
            });
            return;
          }
          dispatch(setFee(numFee));
          setTerraTx({ msgs: [msg], fee: aminoFee });
        }

        /** evm transactions */
        if (
          selectedToken.type === "evm-native" ||
          selectedToken.type === "erc20"
        ) {
          if (wallet.chainId !== selectedToken.chain_id) return; //network selection prompt is shown to user

          const provider = new ethers.providers.Web3Provider(
            getProvider(wallet.providerId) as any
          );
          //no network request
          const signer = provider.getSigner();
          const sender = await signer.getAddress();
          const gasPrice = await signer.getGasPrice();
          const wei_amount = ethers.utils.parseEther(`${debounced_amount}`);

          const tx: TransactionRequest = {
            from: sender,
            to: ap_wallets.eth,
            value: wei_amount,
          };

          let gasLimit: ethers.BigNumber;
          if (selectedToken.type === "erc20") {
            const ER20Contract: any = new ethers.Contract(
              selectedToken.contract_addr,
              ERC20Abi,
              signer
            );
            gasLimit = await ER20Contract.estimateGas.transfer(
              tx.to,
              wei_amount
            );
          } else {
            gasLimit = await signer.estimateGas(tx);
          }

          const minFee = gasLimit.mul(gasPrice);
          const fee = ethers.utils.formatUnits(minFee, selectedToken.decimals);

          setEVMtx(tx);
          dispatch(setFee(parseFloat(fee)));
        }

        dispatch(setFormLoading(false));

        //CW20 token estimate
      } catch (err) {
        console.error(err);
        dispatch(setFormError("tx simulation failed"));
      }
    })();

    return () => {
      dispatch(setFormError(null));
    };
    //eslint-disable-next-line
  }, [debounced_amount, debounced_split, selectedToken, wallet]);

  return { evmTx, terraTx, cosmosTx };
}
