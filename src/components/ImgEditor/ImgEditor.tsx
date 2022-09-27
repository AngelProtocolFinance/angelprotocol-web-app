import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import { Props } from "./types";
import Icon from "components/Icon";
import Loader from "components/Loader";
import useImgEditor from "./useImgEditor";

export default function ImgEditor<T extends FieldValues>(props: Props<T>) {
  const {
    control,
    errors,
    inputRef,
    imageUrl,
    isInitial,
    isLoading,
    isSubmitting,
    onUpload,
    onUndo,
    onCrop,
    onInputChange,
  } = useImgEditor(props);

  const isDisabled = isSubmitting || isLoading;

  return (
    <div className="flex flex-col">
      <div
        className={`grid place-items-center group p-1 rounded-md mb-4 bg-gray-l2 shadow-inner ${
          errors[props.name] ? "shadow-red-500" : "shadow-white"
        } ${props.className ?? ""}`}
        style={{
          background: `no-repeat center/cover url(${imageUrl}) ${
            isDisabled ? "rgba(0, 0, 0, 0.5)" : ""
          }`,
          backgroundBlendMode: "darken",
        }}
      >
        {isLoading ? (
          <LoadingOverlay />
        ) : (
          <Controller
            name={props.name}
            control={control}
            render={({ field: { onChange, ref } }) =>
              !isSubmitting ? (
                <div className="hidden group-hover:flex">
                  <IconButton onClick={onUpload} disabled={isDisabled}>
                    <Icon type="Upload" />
                  </IconButton>
                  {!isInitial && (
                    <IconButton
                      onClick={onUndo(onChange)}
                      disabled={isDisabled}
                    >
                      <Icon type="Undo" />
                    </IconButton>
                  )}
                  {!!imageUrl && (
                    <IconButton
                      onClick={onCrop(onChange)}
                      disabled={isDisabled}
                    >
                      <Icon type="Crop" />
                    </IconButton>
                  )}
                  <input
                    ref={(e) => {
                      ref(e);
                      inputRef.current = e;
                    }}
                    disabled={isDisabled}
                    id={props.name}
                    type="file"
                    onChange={onInputChange(onChange)}
                    accept={props.accept.join(", ")}
                    className="w-0 h-0 appearance-none"
                  />
                </div>
              ) : (
                <></>
              )
            }
          />
        )}
      </div>
      <ErrorMessage
        errors={errors}
        as="p"
        name={props.name}
        className="w-full text-xs text-failed-red text-center"
      />
    </div>
  );
}

function IconButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      type="button"
      className="cursor-pointer text-white text-lg bg-blue hover:bg-blue-d1 disabled:bg-grey-accent/90 p-2 m-1 rounded-md shadow-lg"
    />
  );
}

function LoadingOverlay() {
  return (
    <div className="absolute z-10">
      <Loader gapClass="gap-2" widthClass="w-3" bgColorClass="bg-gray-d2" />
    </div>
  );
}
