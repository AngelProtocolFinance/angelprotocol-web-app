import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { FormValues as FV } from "./types";
import { SchemaShape } from "schemas/types";
import { useGetWallet } from "contexts/WalletContext";
import { requiredString, requiredWalletAddr } from "schemas/string";
import { chainIds } from "constants/chainIds";
import Form from "./Form";

export default function Claim({ classes = "" }) {
  const { wallet } = useGetWallet();
  const methods = useForm<FV>({
    defaultValues: {
      secret: "",
      recipient:
        wallet && wallet.chain.chain_id === chainIds.juno ? wallet.address : "",
      chain: chainIds.juno,
    },
    resolver: yupResolver(
      Yup.object().shape<SchemaShape<FV>>({
        secret: requiredString,
        recipient: requiredWalletAddr(),
      })
    ),
  });

  return (
    <FormProvider {...methods}>
      <Form classes={classes} />
    </FormProvider>
  );
}
