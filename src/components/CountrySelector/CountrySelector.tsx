import { FC } from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { OptionProps } from "react-select";
import AsyncSelect from "react-select/async";
import defaultIcon from "assets/images/angelprotocol-wings-bl.png";

export type CountryOption = {
  name: {
    common: string;
  };
  flags: {
    png?: string;
    svg?: string;
  };
};

const COUNTRIES_ENDPOINT = "https://restcountries.com/v3.1/name";
export default function CountrySelector<T extends FieldValues>(props: {
  classes?: string;
  fieldName: Path<T>;
}) {
  const { control } = useFormContext<T>();
  return (
    <Controller
      control={control}
      name={props.fieldName}
      render={({ field: { onChange, value } }) => (
        <AsyncSelect
          className={props.classes}
          //transform to string for consumption in form
          onChange={(newCountry) => {
            if (newCountry && "name" in newCountry) {
              onChange(newCountry.name.common);
            } else {
              onChange(null);
            }
          }}
          //transform from string to CountryOption
          value={transformValtoCountry(value)}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          loadOptions={loadOptions}
          cacheOptions={true}
          isClearable={true}
          placeholder="Search country"
          noOptionsMessage={getOptionNotFoundMessage}
          components={{ Option: CustomOption }}
        />
      )}
    />
  );
}

async function loadOptions(inputValue: string) {
  const countriesRes = await fetch(`
  ${COUNTRIES_ENDPOINT}/${inputValue}?fields=name,flags`);

  if (countriesRes.status !== 200) {
    return [];
  }

  return countriesRes.json();
}

function transformValtoCountry(value?: string): CountryOption | undefined {
  return value ? { name: { common: value || "" }, flags: {} } : undefined;
}

function getOptionLabel(option: CountryOption) {
  return option.name.common;
}

function getOptionValue(option: CountryOption) {
  return option.name.common;
}

function getOptionNotFoundMessage(obj: { inputValue: string }) {
  return obj.inputValue ? `${obj.inputValue} not found` : "Enter country name";
}

const CustomOption: FC<OptionProps<CountryOption>> = ({
  children,
  innerRef,
  innerProps,
  data,
}) => {
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className="flex items-center gap-2 p-2 hover:bg-angel-blue"
    >
      <img
        src={data.flags.svg || data.flags.png || defaultIcon}
        alt="flag"
        className="w-6 aspect-video object-contain"
      />
      <span className="text-angel-grey">{children}</span>
    </div>
  );
};
