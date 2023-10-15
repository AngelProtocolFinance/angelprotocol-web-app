import { Tab } from "@headlessui/react";
import { DonaterConfigFromWidget } from "types/widget";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet, useSetWallet } from "contexts/WalletContext";
import Status, { LoadingStatus } from "components/Status";
import { FormStep } from "slices/donation";
import Donater from "../Donater";
import Stripe from "./Stripe";
import WalletModal from "./WalletModal";

type Props = {
  donaterConfig: DonaterConfigFromWidget | null;
  state: FormStep;
};
export default function DonateMethods({ donaterConfig, state }: Props) {
  const { wallet, isLoading } = useGetWallet();
  const { connections } = useSetWallet();
  const { showModal } = useModalContext();
  return (
    <Tab.Group as="div" className="grid content-start mt-2">
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
            <div className="grid justify-items-center justify-self-center mt-4">
              <Status icon="Info" classes="mb-4">
                Connect your Web3 wallet to make a crypto donation
              </Status>
              <button
                disabled={isLoading}
                type="button"
                onClick={() => showModal(WalletModal, { connections })}
                className="btn-orange font-work py-2 px-4"
              >
                Connect wallet
              </button>
            </div>
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
