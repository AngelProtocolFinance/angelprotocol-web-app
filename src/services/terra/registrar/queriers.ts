import { chainIDs } from "constants/chainIDs";
import Registrar, { R, T } from "contracts/Registrar";
import useWalletContext from "hooks/useWalletContext";
import { useContract } from "../useContract";
import { registrar_api } from "./registrar";
import { EndowmentStatus, EndowmentStatusStrNum } from "./types";

export function useEndowmentStatus(address: string, skip = false) {
  const { useEndowmentsQuery } = registrar_api;
  const { wallet, contract } = useContract<R, T>(Registrar);
  const { endowmentStatus, isEndowmentStatusLoading } = useEndowmentsQuery(
    contract.endowmentList,
    {
      skip: skip || wallet?.network.chainID === chainIDs.localterra,
      selectFromResult: ({ data, isLoading, isFetching }) => ({
        endowmentStatus: data?.find(
          (endowment) => endowment.address === address
        )?.status,
        isEndowmentStatusLoading: isLoading || isFetching,
      }),
    }
  );
  return { endowmentStatus, isEndowmentStatusLoading };
}

export function useApprovedVaultsRate() {
  const { useApprovedVaultsRateQuery } = registrar_api;
  const { contract, wallet } = useContract<R, T>(Registrar);
  const {
    data = [],
    isError,
    isLoading,
    isFetching,
  } = useApprovedVaultsRateQuery(contract.vaultsRate, {
    skip: wallet?.network.chainID === chainIDs.localterra,
  });

  return {
    vaultsRate: data,
    isVaultsRateError: isError,
    isVaultsRateLoading: isLoading || isFetching,
  };
}

export function useRegistrarConfig() {
  const { useConfigQuery } = registrar_api;
  const { contract, wallet } = useContract<R, T>(Registrar);
  const { data, isError, isLoading, isFetching } = useConfigQuery(
    contract.config,
    {
      skip: wallet?.network.chainID === chainIDs.localterra,
    }
  );

  return {
    registrarConfig: data,
    isError: isError,
    isLoading: isLoading || isFetching,
  };
}

export function useEndowmentLists(skip = false) {
  const { wallet } = useWalletContext();
  const { useEndowmentListsQuery } = registrar_api;
  const contract = new Registrar(wallet);
  const { data, isError, isLoading, isFetching } = useEndowmentListsQuery(
    contract.createEndowmentListQuery({
      endow_type: "charity",
      status: "0",
    }),
    {
      skip: skip || !wallet,
    }
  );
  return {
    endowments: data,
    isEndowmentsError: isError,
    isEndowmentsLoading: isLoading || isFetching,
  };
}
