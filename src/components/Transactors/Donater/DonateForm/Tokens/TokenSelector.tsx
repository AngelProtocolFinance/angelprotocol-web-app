import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import ustLogo from "assets/icons/currencies/ust.svg";
import { useTerraTokensQuery } from "services/apes/currencies";
import { DonateValues } from "components/Transactors/Donater/types";
import { CustomOption } from "./SelectorComponents";

function TokenSelector() {
  const { control } = useFormContext<DonateValues>();
  const {
    data: tokens = [{ native_denom: "uusd", logo: ustLogo, symbol: "UST" }],
  } = useTerraTokensQuery(undefined);

  return (
    <Controller
      name="token"
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <Select
            value={value as any}
            onChange={onChange}
            isSearchable={true}
            options={tokens}
            components={{
              Option: CustomOption,
            }}
          />
        );
      }}
    />
  );
}

export default memo(TokenSelector);
