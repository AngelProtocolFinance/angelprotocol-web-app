import { Dec } from "@terra-money/terra.js";
import { useConnectedWallet } from "@terra-money/use-wallet";
import { useFormContext } from "react-hook-form";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSetModal } from "components/Modal/Modal";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import Admin from "contracts/Admin";
import Indexfund from "contracts/IndexFund";
import { FundDetails } from "contracts/types";
import { useGetter, useSetter } from "store/accessors";
import { useState } from "react";
import { FundCreatorValues } from "./fundDestroyerSchema";
import cleanObject from "helpers/cleanObject";
import { useFundList } from "services/terra/indexFund/queriers";

export default function useDestroyFund() {
  const [isSubmitting, setSubmitting] = useState(false);
  const dispatch = useSetter();
  const wallet = useConnectedWallet();
  const { showModal } = useSetModal();

  async function createFund() {}

  return { createFund, isSubmitting };
}
