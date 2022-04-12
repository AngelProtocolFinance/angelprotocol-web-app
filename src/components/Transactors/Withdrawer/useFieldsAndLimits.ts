import { Dec } from "@terra-money/terra.js";
import { useMemo } from "react";
import { useEndowmentHoldingsState } from "services/terra/account/states";
import { useApprovedVaultsRateState } from "services/terra/registrar/states";
import { vaultMap } from "./constants";
import { VaultFieldIds, VaultFieldLimits } from "./types";

export default function useFieldsAndLimits(accountAddr: string) {
  const { holdings } = useEndowmentHoldingsState(accountAddr);
  const { vaultsRate } = useApprovedVaultsRateState();

  const { vaultFields, vaultLimits } = useMemo(() => {
    //init vaultLimits
    const vaultLimits: VaultFieldLimits = {
      [VaultFieldIds.anchor1_amount]: {
        limit: new Dec(0),
        addr: "",
        rate: new Dec(1),
      },
      [VaultFieldIds.anchor2_amount]: {
        limit: new Dec(0),
        addr: "",
        rate: new Dec(1),
      },
    };

    //map vaultFields while updating limits
    const vaultFields = vaultsRate.map((vault) => {
      const vaultHolding = holdings.liquid_cw20.find(
        (liquidHolding) => liquidHolding.address === vault.vault_addr
      );
      const vaultInfo = vaultMap[vault.vault_addr];
      let ustBalance = new Dec(0);

      if (vaultHolding) {
        ustBalance = new Dec(vaultHolding.amount).mul(vault.fx_rate);
        vaultLimits[vaultInfo.fieldId] = {
          limit: ustBalance,
          addr: vaultHolding.address,
          rate: new Dec(vault.fx_rate),
        };
      }

      return {
        ...vaultInfo,
        ustBalance,
      };
    });

    return { vaultFields, vaultLimits };
  }, [vaultsRate, holdings]);

  return { vaultFields, vaultLimits };
}
