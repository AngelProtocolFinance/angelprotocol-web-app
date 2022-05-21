import { FC, useEffect, useRef } from "react";
import { FieldValues, Path, useController } from "react-hook-form";
import { OptionProps, SingleValueProps } from "react-select";
import AsyncSelect from "react-select/async";
import { CountryOption } from "./types";
import defaultIcon from "assets/images/angelprotocol-wings-bl.png";
import { COUNTRIES_REST_ENDPOINT } from "constants/urls";

const VALUE_SEPARATOR = " ";
export default function CountrySelector<T extends FieldValues>(props: {
  classes?: string;
  fieldName: Path<T>;
}) {
  const {
    formState: { isSubmitting },
    field: { onChange, value: countryStr },
  } = useController<T>({ name: props.fieldName });

  const countryRefStr = useRef<string>();

  useEffect(() => {
    const initCountryCode = countryStr; //starting value country code | null
    if (!initCountryCode) return;
    fetch(
      `${COUNTRIES_REST_ENDPOINT}/alpha/${initCountryCode}?fields=name,cca2`
    )
      .then((res) => res.json())
      .then((country: CountryOption) => {
        //if valid country code, set & save initial value
        const countryStr = combineCodeAndName(country);
        countryRefStr.current = countryStr;
        onChange(countryStr);
      })
      //if starting value is not a valid country code
      //just clear singleVal container
      .catch(() => {
        onChange(null);
      });
    //eslint-disable-next-line
  }, []);

  return (
    <AsyncSelect
      isDisabled={isSubmitting}
      className={props.classes}
      //transform to string for consumption in form
      onChange={(newCountry) => {
        if (newCountry && "name" in newCountry) {
          const countryStr = combineCodeAndName(newCountry);
          onChange(countryStr);
          //change attempt would clear initial value
          countryRefStr.current = countryStr;
        } else {
          onChange(null);
        }
      }}
      onMenuOpen={() => {
        onChange(null);
      }}
      onMenuClose={() => {
        //go back to previously saved countryStr
        onChange(countryRefStr.current);
      }}
      //transform from string to CountryOption
      value={transformValtoCountry(countryStr)}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      loadOptions={loadOptions}
      cacheOptions={true}
      isClearable={true}
      placeholder="Search country"
      noOptionsMessage={getOptionNotFoundMessage}
      components={{ Option, SingleValue }}
    />
  );
}

async function loadOptions(inputValue: string) {
  const countriesRes = await fetch(`
  ${COUNTRIES_REST_ENDPOINT}/name/${inputValue}?fields=name,flags,cca2`);
  if (countriesRes.status !== 200) {
    return [];
  }

  return countriesRes.json();
}

function transformValtoCountry(value?: string): CountryOption {
  if (value) {
    const [code, ...name] = value.split(VALUE_SEPARATOR);
    return {
      name: { common: name.join(VALUE_SEPARATOR) || "" },
      flags: {},
      cca2: code || "",
    };
  } else {
    return { name: { common: "" }, flags: {}, cca2: "" };
  }
}

//batch code and name, so transformValToCountry can reconstruct CountryOption,
//and be appropriately get render value by getOptionValue
function combineCodeAndName(option: CountryOption) {
  return `${option.cca2}${VALUE_SEPARATOR}${option.name.common}`;
}

function getOptionLabel(option: CountryOption) {
  return combineCodeAndName(option);
}

function getOptionValue(option: CountryOption) {
  return combineCodeAndName(option);
}

function getOptionNotFoundMessage(obj: { inputValue: string }) {
  return obj.inputValue ? `${obj.inputValue} not found` : "Enter country name";
}

//format single value,
const SingleValue: FC<SingleValueProps<CountryOption>> = ({
  // data, data here is output from transformValToCountry
  children, //children is output from getOptionValue
  innerProps,
}) => {
  const [code, ...name] = (children?.toString() || "").split(VALUE_SEPARATOR);
  return (
    <div {...innerProps} className="absolute inset-0 pl-2 flex items-center">
      <span>{name.join(VALUE_SEPARATOR)}</span>
      {code && (
        <span className="inline-block ml-1 mt-1 text-xs font-bold font-mono">
          ({code})
        </span>
      )}
    </div>
  );
};

const Option: FC<OptionProps<CountryOption>> = ({
  children,
  innerRef,
  innerProps,
  data,
}) => {
  const [code, ...name] = (children?.toString() || "").split(VALUE_SEPARATOR);
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
      <p className="text-angel-grey">
        <span>{name.join(VALUE_SEPARATOR)}</span>
        <span className="inline-block ml-1 text-xs font-bold font-mono">
          ({code})
        </span>
      </p>
    </div>
  );
};
