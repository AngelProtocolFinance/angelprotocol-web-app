import { ErrorMessage } from "@hookform/error-message";
import Icon from "components/Icon";
import { humanize } from "helpers";
import React from "react";
import { useDropzone } from "react-dropzone";
import { FieldValues, Path, get, useFormContext } from "react-hook-form";
import { ImgLink, Props } from "./types";
import useImgEditor from "./useImgEditor";

const BYTES_IN_MB = 1e6;

type Key = keyof ImgLink;
const precropFileKey: Key = "precropFile";

export default function ImgEditor<T extends FieldValues, K extends Path<T>>(
  props: Props<T, K>
) {
  const { name, classes, maxSize, accept } = props;
  const precropFilePath: any = `${String(name)}.${precropFileKey}`;

  const {
    formState: { errors, isSubmitting },
  } = useFormContext<T>();

  const {
    handleOpenCropper,
    handleReset,
    imgSize,
    isInitial,
    noneUploaded,
    onDrop,
    preview,
    ref,
  } = useImgEditor(props);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    disabled: isSubmitting,
    multiple: false,
    onDrop,
  });

  const invalid = !!get(errors, name);
  const overlay = `before:content-[''] before:absolute before:inset-0 data-[drag="true"]:before:bg-blue-l5 `;

  return (
    <div className={`${classes?.container ?? ""} grid grid-rows-[1fr_auto]`}>
      <div
        data-invalid={invalid}
        data-drag={isDragActive}
        data-disabled={isSubmitting}
        {...getRootProps({
          className: `relative ${overlay} ${classes?.dropzone ?? ""} group rounded border border-gray-l2 border-dashed 
          focus:outline-none focus:ring-2 data-[drag="true"]:ring-2 has-[:active]:ring-2 ring-blue-d1 ring-offset-2 
          hover:bg-blue-l5
          data-[disabled="true"]:bg-gray-l5 data-[disabled="true"]:pointer-events-none
          data-[invalid="true"]:border-red
          `,
          ref,
        })}
        style={{
          background: preview
            ? `url('${preview}') center/cover no-repeat`
            : undefined,
        }}
      >
        {noneUploaded ? (
          <div
            className="absolute-center grid justify-items-center text-sm text-navy-l1 dark:text-navy-l2 select-none"
            tabIndex={-1}
          >
            <Icon type="FileUpload" size={24} className="mb-[1.125rem]" />
            <p className="font-semibold mb-1">Upload file</p>
            <span className="text-center">
              Click to Browse or Drag &amp; Drop
            </span>
          </div>
        ) : (
          /** something is uploaded and would disrupt text above
           *  so just show upload icon instead of it.
           */
          <div className="absolute-center hidden group-hover:flex">
            <div className={buttonStyle}>
              <input {...getInputProps()} />
              <Icon type="Upload" />
            </div>
            {
              /** only show controls if new file is uploaded */
              !isInitial && (
                <IconButton disabled={isSubmitting} onClick={handleReset}>
                  <Icon type="Undo" />
                </IconButton>
              )
            }
            {!isInitial && (
              <IconButton onClick={handleOpenCropper} disabled={isSubmitting}>
                <Icon type="Crop" />
              </IconButton>
            )}
          </div>
        )}
      </div>
      <p className="text-xs text-navy-l1 dark:text-navy-l2 mt-2">
        <span>
          Valid types are:{" "}
          {accept.map((m) => m.split("/")[1].toUpperCase()).join(", ")}.{" "}
          {maxSize ? (
            <>
              Image should be less than {maxSize / BYTES_IN_MB}MB in size.
              <br />
              {imgSize
                ? `Current image size: ${humanize(imgSize / BYTES_IN_MB)}MB.`
                : ""}
            </>
          ) : (
            ""
          )}
        </span>{" "}
        <ErrorMessage
          errors={errors}
          name={precropFilePath as any}
          as="span"
          className="text-red dark:text-red-l2 text-xs before:content-['('] before:mr-0.5 after:content-[')'] after:ml-0.5 empty:before:hidden empty:after:hidden"
        />
      </p>
    </div>
  );
}

const buttonStyle =
  "cursor-pointer text-white text-lg bg-blue hover:bg-blue-l1 disabled:bg-gray-l2 p-2 m-1 rounded-md shadow-lg";
function IconButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} type="button" className={buttonStyle} />;
}
