import { Dialog } from "@headlessui/react";
import { useCallback } from "react";
import { invalidateApesTags } from "services/apes";
import { useModalContext } from "contexts/ModalContext";
import { WithWallet } from "contexts/WalletContext";
import IFrame from "components/IFrame";
import Icon from "components/Icon";
import { useSetter } from "store/accessors";
import { SubmitStep } from "slices/donation";
import { ap_wallets } from "constants/ap_wallets";
import { KADO_API_KEY } from "constants/env";

export default function FiatKadoModal(props: WithWallet<SubmitStep>) {
  const { token } = props.details;
  const dispatch = useSetter();
  const { closeModal, setModalOption } = useModalContext();

  const handleOnLoad = useCallback(
    () =>
      // there is a high chance the user bought some new crypto prior to closing this modal
      // reload the page to get new wallet balances
      setModalOption("onClose", () => dispatch(invalidateApesTags(["chain"]))),
    [setModalOption, dispatch]
  );

  const onToAddress = ap_wallets.eth;

  return (
    <Dialog.Panel className="fixed inset-0 sm:fixed-center z-10 flex flex-col sm:w-[500px] sm:h-[700px] bg-gray-l5 dark:bg-blue-d6 sm:border border-prim sm:rounded">
      <Dialog.Title
        as="h3"
        className="relative w-full pl-4 px-4 sm:px-0 py-4 sm:py-6 bg-orange-l6 border-b border-prim rounded-t font-heading font-black sm:font-bold sm:text-center text-xl text-orange sm:text-gray-d2 dark:text-white uppercase sm:normal-case dark:bg-blue-d7 "
      >
        Buy with Kado
        <button
          className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 mr-4 sm:border border-prim hover:border-gray sm:rounded  dark:hover:border-bluegray-d1 text-gray-d2 hover:text-black dark:text-white dark:hover:text-gray"
          onClick={closeModal}
        >
          <Icon type="Close" className="w-8 sm:w-7 h-8 sm:h-7" />
        </button>
      </Dialog.Title>
      <IFrame
        src={`https://app.kado.money?apiKey=${KADO_API_KEY}&onPayCurrency=${token.symbol}&onRevCurrency=USDC&onPayAmount=${token.amount}&onToAddress=${onToAddress}&cryptoList=USDC&network=ethereum&product=BUY&networkList=ethereum`}
        className="w-full h-full border-none rounded-b"
        title="Buy with Kado"
        onLoad={handleOnLoad}
      />
    </Dialog.Panel>
  );
}
