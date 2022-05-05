export default function X() {
  return <></>;
}

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
