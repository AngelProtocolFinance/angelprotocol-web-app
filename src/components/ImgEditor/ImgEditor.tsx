import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { useDropzone } from "react-dropzone";
import { FieldValues, useFormContext } from "react-hook-form";
import { ImgLink, Props } from "./types";
import Icon from "components/Icon";
import useImgEditor from "./useImgEditor";

type Key = keyof ImgLink;
const fileKey: Key = "file";

export default function ImgEditor<T extends FieldValues, K extends keyof T>(
  props: Props<T, K>
) {
  const { name, classes } = props;
  const filePath: any = `${String(name)}.${fileKey}`;

  const {
    formState: { errors, isSubmitting },
  } = useFormContext<T>();

  const { onDrop, handleOpenCropper, isInitial, handleReset, preview } =
    useImgEditor(props);

  const { getRootProps, getInputProps } = useDropzone({
    disabled: isSubmitting,
    multiple: false,
    onDrop,
  });

  const overlay = `rgba(254,254,254,${isSubmitting ? 0.6 : 0})`;

  return (
    <div
      className={`relative grid place-items-center group ${classes}`}
      style={{
        background: `linear-gradient(${overlay},${overlay}), url(${preview}) center/cover no-repeat `,
      }}
    >
      <div className="absolute hidden group-hover:flex">
        <div {...getRootProps({ className: buttonStyle })}>
          <input {...getInputProps()} />
          <Icon type="Upload" />
        </div>
        {!isInitial && (
          <IconButton disabled={isSubmitting} onClick={handleReset}>
            <Icon type="Undo" />
          </IconButton>
        )}
        {
          //allow crop only on new uploaded image
          !isInitial && (
            <IconButton onClick={handleOpenCropper} disabled={isSubmitting}>
              <Icon type="Crop" />
            </IconButton>
          )
        }
      </div>

      <ErrorMessage
        errors={errors}
        as="p"
        name={filePath as any}
        className="w-full text-xs text-red-l1 text-right absolute -bottom-5 right-0"
      />
    </div>
  );
}

const buttonStyle =
  "cursor-pointer text-white text-lg bg-blue hover:bg-blue-l1 disabled:bg-gray-l1 p-2 m-1 rounded-md shadow-lg";
function IconButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} type="button" className={buttonStyle} />;
}
