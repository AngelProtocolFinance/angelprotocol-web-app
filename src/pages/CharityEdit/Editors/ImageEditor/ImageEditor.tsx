import React, { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";
import { IconType } from "react-icons";
import useImageEditor from "hooks/useImageEditor";
import { getIcon } from "components/Icons/Icons";
import { EditableProfileAttr as E } from "services/aws/endowments/types";
import Loader from "components/Loader/Loader";

export default function ImageEditor() {
  const { watch } = useFormContext<E>();
  const { handleFileChange, handleImageReset, loading, isInitial, inputRef } =
    useImageEditor<E>("charity_image");
  const charity_image = watch("charity_image");
  return (
    <div
      style={{
        background: `no-repeat center/cover url(${charity_image})`,
      }}
      className="grid place-items-center relative group bg-red-400 w-full h-48 p-1 rounded-md mb-4 shadow-inner"
    >
      {(loading && <LoadingOverlay />) || (
        <Controls
          handleFileChange={handleFileChange}
          handleImageReset={handleImageReset}
          loading={loading}
          isInitial={isInitial}
          inputRef={inputRef}
        />
      )}
    </div>
  );
}

type Common = { Icon: IconType; disabled?: boolean };
type ControlProps =
  | { type: "upload"; onClick?: never; htmlFor: string }
  | {
      type: "reset";
      onClick: () => void;
      htmlFor?: never;
    };
function ImageControl(props: ControlProps & Common) {
  const { Icon, type, ...valitAttrs } = props;
  return React.createElement(props.type === "reset" ? "button" : "label", {
    ...valitAttrs,
    className:
      "cursor-pointer text-white text-lg bg-angel-blue hover:bg-blue-accent disabled:bg-grey-accent/90 p-2 m-1 rounded-md shadow-lg",
    children: <Icon />,
  });
}

function LoadingOverlay() {
  return (
    <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full z-99">
      <Loader gapClass="gap-4" widthClass="w-4" bgColorClass="bg-white" />
    </div>
  );
}

interface IControls {
  inputRef: any;
  loading: boolean;
  isInitial: boolean;
  handleImageReset: () => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Controls(props: IControls) {
  return (
    <div className="hidden absolute group-hover:flex">
      <ImageControl
        type="upload"
        htmlFor="file__image"
        Icon={getIcon("Upload")}
        disabled={props.loading}
      />
      <ImageControl
        type="reset"
        onClick={props.handleImageReset}
        Icon={getIcon("Undo")}
        disabled={props.isInitial || props.loading}
      />
      <input
        ref={props.inputRef}
        disabled={props.loading}
        id="file__image"
        type="file"
        onChange={props.handleFileChange}
        accept="image/png, image/jpeg, image/svg"
        className="w-0 h-0 appearance-none"
      />
    </div>
  );
}
