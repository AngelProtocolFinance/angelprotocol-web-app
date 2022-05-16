import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Select, {
  ControlProps,
  MenuListProps,
  NoticeProps,
  OptionProps,
  SingleValueProps,
  ValueContainerProps,
} from "react-select";
import { Token, useTokensQuery } from "services/apes/tokens";
import { DonateValues } from "components/Transactors/Donater/types";
import { createUSTToken } from "components/WalletSuite/useWalletUpdator";

export default function TokenSelector(props: { classes?: string }) {
  const { control } = useFormContext<DonateValues>();
  const { data: tokens = [createUSTToken(0)] } = useTokensQuery(undefined);

  return (
    <Controller
      name="token"
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
    <div ref={innerRef} {...innerProps} className="flex gap-2">
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
      className="w-full flex items-center gap-2 p-2 hover:bg-angel-blue cursor-pointer"
    >
      <img src={option.logo} alt="" className="w-6 h-6 object-contain" />
      <p className="text-angel-grey text-sm">{children}</p>
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
