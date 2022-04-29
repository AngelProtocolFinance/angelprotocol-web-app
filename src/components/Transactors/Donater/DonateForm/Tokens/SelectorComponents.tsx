import { ComponentType, FC, memo } from "react";
import { useFormContext } from "react-hook-form";
import {
  ControlProps,
  GroupBase,
  MenuListProps,
  MenuProps,
  OptionProps,
  ValueContainerProps,
} from "react-select";
import Icon from "components/Icons/Icons";
import { currency_icons } from "constants/currency";
import { DonateValues } from "../../types";
import { TokenOption } from "./types";

export const CustomOption: FC<OptionProps<TokenOption>> = (props) => {
  const { data: option, innerRef, innerProps, isSelected } = props;
  return (
    <div ref={innerRef} {...innerProps} className="w-full">
      <button
        disabled={isSelected}
        className="uppercase flex items-center gap-3 p-1 text-sm cursor-pointer disabled:bg-angel-blue disabled:text-white hover:bg-angel-blue disabled:bg-opacity-50 group w-full"
      >
        <img src={option.logo} alt="" className="w-4 h-4 object-contain" />
        <p className="text-angel-grey font-semibold text-md group-hover:text-white">
          {option.label}
        </p>
      </button>
    </div>
  );
};

// export const CustomMenu:
//   | ComponentType<MenuProps<any, boolean, GroupBase<any>>>
//   | undefined = memo((props: MenuProps<TokenOption>) => {
//   const { children, innerRef, innerProps } = props;
//   return (
//     <div
//       ref={innerRef}
//       {...innerProps}
//       className="absolute top-100 left-0 w-115 bg-white scroll-hidden p-2 rounded-lg"
//     >
//       <h1 className="text-sm font-bold mb-2">Select token</h1>
//       {children}
//     </div>
//   );
// });

// export const MenuList:
//   | ComponentType<MenuListProps<any, boolean, GroupBase<any>>>
//   | undefined = memo((props: MenuListProps) => {
//   const { children, innerRef, innerProps } = props;
//   return (
//     <div
//       ref={innerRef}
//       {...innerProps}
//       className="bg-white scroll-hidden max-h-116 overflow-y-auto"
//     >
//       {children}
//     </div>
//   );
// });

// export const ValueContainer:
//   | ComponentType<ValueContainerProps<any, boolean, GroupBase<any>>>
//   | undefined = memo((props: ValueContainerProps) => {
//   const { children, innerProps } = props;
//   const { watch } = useFormContext<DonateValues>();
//   const selectedCurrency = watch("currency");
//   return (
//     <div
//       {...innerProps}
//       className="bg-transparent flex flex-row gap-1 items-center justify-evenly outline-none border-none text-sm"
//     >
//       <img
//         src={currency_icons[selectedCurrency]}
//         alt={`${selectedCurrency} icon`}
//         className="w-5 h-5 object-contain mr-0.5"
//       />
//       {children}
//       <Icon
//         type="ChevronDown"
//         width={15}
//         className="font-bold text-md cursor-pointer"
//       />
//     </div>
//   );
// });

// export const ControlContainer:
//   | ComponentType<ControlProps<any, boolean, GroupBase<any>>>
//   | undefined = memo((props: ControlProps) => {
//   const { children, innerProps, innerRef } = props;
//   return (
//     <div
//       ref={innerRef}
//       {...innerProps}
//       className="bg-transparent flex items-center justify-end outline-none border-none"
//     >
//       {children}
//     </div>
//   );
// });
