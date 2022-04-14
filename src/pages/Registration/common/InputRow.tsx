import { FC, PropsWithChildren } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { useSetModal } from "components/Modal/Modal";

export type InputRowProps = PropsWithChildren<{
  htmlFor?: string;
  label: string;
  required?: true | boolean;
  infoModal?: FC<{}>;
}>;

export default function InputRow(props: InputRowProps) {
  const { htmlFor: id, label, required, infoModal, children } = props;

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex items-center gap-2 h-8">
        <label htmlFor={id} className="cursor-pointer">
          {label}
          {required && <span className="text-failed-red ml-0.5">*</span>}
        </label>
        {!!infoModal && <InfoIcon modal={infoModal} />}
      </div>
      <div className="flex flex-col justify-center gap-1 w-full">
        {children}
      </div>
    </div>
  );
}

function InfoIcon({ modal }: { modal: FC<{}> }) {
  const { showModal } = useSetModal();
  return (
    <BsQuestionCircle
      className="text-thin-blue cursor-pointer"
      onClick={() => showModal(modal, {})}
    />
  );
}
