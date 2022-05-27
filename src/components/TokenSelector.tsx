import { FC } from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import Select, {
  ControlProps,
  MenuListProps,
  MenuProps,
  NoticeProps,
  OptionProps,
  SingleValueProps,
  ValueContainerProps,
} from "react-select";
import { Token } from "types/server/aws";
// import { useTokensQuery } from "services/apes/tokens";
import { tokenList as tokens } from "services/apes/tokens/constants";

export default function TokenSelector<T extends FieldValues>(props: {
  classes?: string;
  fieldName: Path<T>;
}) {
  const { control } = useFormContext<T>();
  // const { data: tokens = [createUSTToken(0)] } = useTokensQuery(undefined);

  return (
    <Controller
      name={props.fieldName}
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <Select
            className={props.classes}
            value={value}
            onChange={onChange}
            options={tokens}
            getOptionLabel={getOptionLabel}
            noOptionsMessage={(obj) => `${obj.inputValue} not found`}
            components={{
              Control,
              ValueContainer,
              SingleValue,
              IndicatorSeparator: null,
              Menu,
              MenuList,
              Option,
              NoOptionsMessage,
            }}
          />
        );
      }}
    />
  );
}

const Control: FC<ControlProps<Token>> = ({
  children,
  innerProps,
  innerRef,
}) => {
  return (
    <div ref={innerRef} {...innerProps} className="relative flex gap-2">
      {children}
    </div>
  );
};

const ValueContainer: FC<ValueContainerProps<Token>> = ({
  innerProps,
  children,
}) => (
  <div {...innerProps} className="flex text-sm">
    {children}
  </div>
);

const SingleValue: FC<SingleValueProps<Token>> = ({
  children,
  data,
  innerProps,
}) => {
  return (
    <div {...innerProps} className="flex gap-2 items-center">
      <img src={data.logo} alt="" className="w-6 h-6 object-contain" />
      <p>{children}</p>
    </div>
  );
};

const getOptionLabel = (option: Token) => option.symbol;
const Option: FC<OptionProps<Token>> = ({
  data: option,
  innerRef,
  innerProps,
  children,
}) => {
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className="w-full flex items-center gap-2 p-2 pr-4 hover:bg-angel-blue cursor-pointer"
    >
      <img src={option.logo} alt="" className="w-6 h-6 object-contain" />
      <p className="text-angel-grey text-sm">{children}</p>
    </div>
  );
};
const Menu: FC<MenuProps<Token>> = ({ innerProps, innerRef, children }) => {
  return (
    <div ref={innerRef} {...innerProps} className="absolute right-0 shadow-lg">
      {children}
    </div>
  );
};

const MenuList: FC<MenuListProps<Token>> = ({
  innerProps,
  innerRef,
  children,
}) => {
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className="bg-white scroll-hidden max-h-116 overflow-y-auto rounded-md min-w-max"
    >
      {children}
    </div>
  );
};

const NoOptionsMessage: FC<NoticeProps<Token>> = ({ innerProps, children }) => {
  return (
    <div {...innerProps} className="text-sm text-red-400/70 p-2">
      {children}
    </div>
  );
};

// const createUSTToken = (balance: number) => ({
//   balance,
//   min_denom: denoms.uusd,
//   symbol: "UST",
//   decimals: 6,
//   logo: denomIcons.uusd,
// });
