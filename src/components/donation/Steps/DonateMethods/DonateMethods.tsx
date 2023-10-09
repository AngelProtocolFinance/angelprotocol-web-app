import { Tab } from "@headlessui/react";
import { DonaterConfigFromWidget } from "types/widget";
import { useGetWallet } from "contexts/WalletContext";
import Status, { LoadingStatus } from "components/Status";
import { FormStep } from "slices/donation";
import Donater from "../Donater";

type Props = {
  donaterConfig: DonaterConfigFromWidget | null;
  state: FormStep;
};
export default function DonateMethods({ donaterConfig, state }: Props) {
  const { wallet, isLoading } = useGetWallet();
  return (
    <Tab.Group>
      <Tab.List>
        <Tab>Credit/Debit</Tab>
        <Tab>Crypto</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <div>stripe donate form</div>
        </Tab.Panel>
        <Tab.Panel>
          {!wallet ? (
            <Status icon="Info" classes="justify-self-center">
              You need to connect your wallet to make a donation
            </Status>
          ) : isLoading ? (
            <LoadingStatus classes="justify-self-center">
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
