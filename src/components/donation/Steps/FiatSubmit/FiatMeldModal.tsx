import { Dialog } from "@headlessui/react";
import { useCallback, useEffect, useState } from "react";
import { useModalContext } from "contexts/ModalContext";
import { WithWallet } from "contexts/WalletContext";
import IFrame from "components/IFrame";
import Icon from "components/Icon";
import { useSetter } from "store/accessors";
import { SubmitStep } from "slices/donation";
import { sendFiatDonation } from "slices/donation/sendDonation";
import { getFiatWidgetUrl } from "helpers/getFiatWidgetUrl";

export default function FiatMeldModal(props: WithWallet<SubmitStep>) {
  const { token } = props.details;
  const dispatch = useSetter();
  const { closeModal, setModalOption } = useModalContext();
  const [url, setUrl] = useState();
  const [externalSessionId, setExternalSessionId] = useState<string>("");
  const handleOnLoad = useCallback(
    () =>
      // there is a high chance the user bought some new crypto prior to closing this modal
      // reload the page to get new wallet balances
      setModalOption("onClose", () => {
        const { wallet, ...donation } = props;
        dispatch(sendFiatDonation({ donation, wallet, externalSessionId }));
      }),
    [setModalOption, props, dispatch, externalSessionId]
  );

  useEffect(() => {
    getFiatWidgetUrl(token, props.wallet.address)
      .then((response) => {
        setUrl(response.widgetUrl);
        setExternalSessionId(response.externalSessionId);
      })
      .catch((err) => console.error(err));
  }, [props.wallet.address, token]);

  return (
    <Dialog.Panel className="fixed inset-0 sm:fixed-center z-10 flex flex-col sm:w-[500px] sm:h-[700px] bg-gray-l5 dark:bg-blue-d6 sm:border border-prim sm:rounded">
      <Dialog.Title
        as="h3"
        className="relative w-full pl-4 px-4 sm:px-0 py-4 sm:py-6 bg-orange-l6 border-b border-prim rounded-t font-heading font-black sm:font-bold sm:text-center text-xl text-orange sm:text-gray-d2 dark:text-white uppercase sm:normal-case dark:bg-blue-d7 "
      >
        Buy with Transak
        <button
          className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 mr-4 sm:border border-prim hover:border-gray sm:rounded  dark:hover:border-bluegray-d1 text-gray-d2 hover:text-black dark:text-white dark:hover:text-gray"
          onClick={closeModal}
        >
          <Icon type="Close" className="w-8 sm:w-7 h-8 sm:h-7" />
        </button>
      </Dialog.Title>
      <IFrame
        src={url}
        className="w-full h-full border-none rounded-b"
        title="Buy with Transak"
        onLoad={handleOnLoad}
      />
    </Dialog.Panel>
  );
}
