import { Popover } from "@headlessui/react";
import { ButtonHTMLAttributes, Fragment } from "react";
import ChainGuard, { ChainGuardProps, ChainWallet } from "contexts/ChainGuard";

type Props<T> = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & {
  submitFn: T;
  submitArgs: T extends (wallet: ChainWallet, ...args: infer Args) => any
    ? Args
    : never;
} & Pick<ChainGuardProps, "allowedWallets" | "requiredNetwork">;

export default function TxSubmitter<
  T extends (wallet: ChainWallet, ...args: any[]) => any
>({
  allowedWallets,
  requiredNetwork,
  submitArgs,
  submitFn,
  ...props
}: Props<T>) {
  return (
    <ChainGuard
      allowedWallets={allowedWallets}
      requiredNetwork={requiredNetwork}
      prompt={(status) => {
        if (status.id === "verified") {
          return (
            <button
              {...props}
              onClick={() => submitFn(status.wallet, ...submitArgs)}
            />
          );
        }
        return (
          <Popover as={Fragment}>
            <Popover.Button {...props} />
            <Popover.Panel
              className={
                "fixed-center z-10 bg-zinc-50 text-zinc-800 p-4 rounded-md"
              }
            >
              {status.content}
            </Popover.Panel>
          </Popover>
        );
      }}
    />
  );
}
