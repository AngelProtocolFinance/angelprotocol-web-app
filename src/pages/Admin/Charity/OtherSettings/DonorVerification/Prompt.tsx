import { FormProvider, useForm } from "react-hook-form";
import { VerificationRequired } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon/Icon";
import Modal from "components/Modal";
import { Radio } from "components/form";
import Message from "./Message";

type Props = {
  currentValue: VerificationRequired;
  onChange: (value: VerificationRequired) => void;
};

type FV = {
  isVerificationRequired: VerificationRequired;
};

export default function Prompt({ currentValue, onChange }: Props) {
  const { closeModal } = useModalContext();

  const methods = useForm<FV>({
    defaultValues: {
      isVerificationRequired: currentValue,
    },
  });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <Modal
        as="form"
        onSubmit={handleSubmit(({ isVerificationRequired }) => {
          onChange(isVerificationRequired);
          closeModal();
        })}
        className="fixed-center z-10 grid text-gray-d2 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-xl rounded overflow-hidden"
      >
        <div className="relative">
          <h3 className="text-xl text-center border-b bg-orange-l6 dark:bg-blue-d7 border-prim p-5">
            Change settings
          </h3>
          <button
            onClick={closeModal}
            className="border border-prim p-2 rounded-md absolute top-1/2 right-4 transform -translate-y-1/2 disabled:text-gray-l3 dark:disabled:text-bluegray-d1 disabled:dark:border-bluegray-d1"
          >
            <Icon type="Close" size={24} />
          </button>
        </div>
        <div className="flex flex-col justify-center gap-4 px-8 py-12">
          <Radio<FV, "isVerificationRequired">
            classes="px-4 py-3 border border-prim rounded cursor-pointer"
            name="isVerificationRequired"
            value="no"
          >
            <Message verificationRequired="yes" />
          </Radio>
          <Radio<FV, "isVerificationRequired">
            classes="px-4 py-3 border border-prim rounded cursor-pointer"
            name="isVerificationRequired"
            value="no"
          >
            <Message verificationRequired="no" />
          </Radio>
        </div>
        <div className="flex justify-center md:justify-end gap-3 p-3 sm:px-8 sm:py-4 empty:h-12 w-full text-center bg-orange-l6 dark:bg-blue-d7 border-t border-prim">
          <button
            type="button"
            className="inline-block btn-outline-filled w-32 h-12 text-sm"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-block btn-orange w-32 h-12 text-sm"
          >
            Change
          </button>
        </div>
      </Modal>
    </FormProvider>
  );
}
