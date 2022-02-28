import { useSetModal } from "components/Modal/Modal";
import { FC, PropsWithChildren } from "react";
import { BsQuestionCircle } from "react-icons/bs";

export type InputRowProps = PropsWithChildren<{
  id?: string;
  label: string;
  required?: true | boolean;
  modal?: FC<{}>;
}>;

export default function InputRow(props: InputRowProps) {
  const { id, label, required, modal, children } = props;

  return (
    <div className="grid grid-cols-2 items-center">
      <div className="flex items-center gap-2">
        <label htmlFor={id} className="hover:cursor-pointer">
          {label}
          {required && <span className="text-failed-red ml-0.5">*</span>}
        </label>
        {!!modal && <InfoIcon modal={modal} />}
      </div>
      <div className="flex flex-col gap-1 w-full items-center relative">
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
