import { Tab } from "@headlessui/react";
import { DonaterConfigFromWidget } from "types/widget";
import { useGetWallet } from "contexts/WalletContext";
import Status, { LoadingStatus } from "components/Status";
import { FormStep } from "slices/donation";
import Donater from "../Donater";
import Stripe from "./Stripe";

type Props = {
  donaterConfig: DonaterConfigFromWidget | null;
  state: FormStep;
};
export default function DonateMethods({ donaterConfig, state }: Props) {
  const { wallet, isLoading } = useGetWallet();
  return (
    <Tab.Group as="div" className="grid content-start min-w-[30rem] mt-2">
      <Tab.List as="div" className="grid grid-cols-2 mb-6">
        <Tab
          className={({ selected }) =>
            `${
              selected ? "border-orange" : "border-gray-l3 dark:border-bluegray"
            } uppercase p-2 border-b-4 hover:text-orange-l1`
          }
        >
          Credit/Debit
        </Tab>
        <Tab
          className={({ selected }) =>
            `${
              selected ? "border-orange" : "border-gray-l3 dark:border-bluegray"
            } uppercase p-2 border-b-4 hover:text-orange-l1`
          }
        >
          Crypto
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel className="grid">
          <Stripe
            widgetConfig={donaterConfig}
            advanceOptDisplay={
              donaterConfig?.advancedOptionsDisplay ?? "collapsed"
            }
            state={state}
          />
        </Tab.Panel>
        <Tab.Panel className="grid">
          {!wallet ? (
            <Status icon="Info" classes="justify-self-center mt-4">
              You need to connect your wallet to make a donation
            </Status>
          ) : isLoading ? (
            <LoadingStatus classes="justify-self-center mt-4">
              Loading wallet
            </LoadingStatus>
          ) : (
            <Donater {...state} config={donaterConfig} wallet={wallet} />
          )}
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
