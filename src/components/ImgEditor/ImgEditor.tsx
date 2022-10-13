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
    formState: { errors },
  } = useFormContext<T>();

  const { onDrop, handleOpenCropper, isInitial, handleReset, preview } =
    useImgEditor(props);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop,
  });

  return (
    <div
      className={`relative grid place-items-center group ${classes}`}
      style={{
        background: `no-repeat center/cover url(${preview})`,
      }}
    >
      <div className="absolute hidden group-hover:flex">
        <div {...getRootProps()} className={buttonStyle}>
          <input {...getInputProps()} />
          <Icon type="Upload" />
        </div>
        <IconButton disabled={isInitial} onClick={handleReset}>
          <Icon type="Undo" />
        </IconButton>
        {
          //allow crop only on new uploaded image
          !isInitial && (
            <IconButton onClick={handleOpenCropper}>
              <Icon type="Crop" />
            </IconButton>
          )
        }
      </div>

      <ErrorMessage
        errors={errors}
        as="p"
        name={filePath as any}
        className="w-full text-xs text-failed-red text-right absolute -bottom-5 right-0"
      />
    </div>
  );
}

const buttonStyle =
  "cursor-pointer text-white text-lg bg-angel-blue hover:bg-blue-accent disabled:bg-grey-accent/90 p-2 m-1 rounded-md shadow-lg";
function IconButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} type="button" className={buttonStyle} />;
}
