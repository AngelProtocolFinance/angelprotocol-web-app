import { humanize } from "helpers/decimal";
import { fixedForwardRef } from "helpers/react";
import { unpack } from "helpers/unpack";
import { uploadFile } from "helpers/upload-file";
import { ArrowUpFromLine, Crop, Undo } from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
import { type DropzoneOptions, useDropzone } from "react-dropzone-esm";
import { AspectTooltip } from "./aspect-tooltip";
import { ImgCropper } from "./img-cropper";
import type { ControlledProps } from "./types";

const BYTES_IN_MB = 1e6;

function _ImgEditor(props: ControlledProps, ref: React.Ref<HTMLInputElement>) {
  const [file, setFile] = useState<File>();
  const [openCropper, setOpenCropper] = useState(false);

  const preview = useMemo(
    () =>
      file
        ? props.spec.type.includes(file.type as any)
          ? URL.createObjectURL(file)
          : ""
        : props.value,
    [file, props.spec.type, props.value]
  );

  const onDrop: DropzoneOptions["onDrop"] = (files: File[]) => {
    const newFile = files[0];
    const size = newFile.size;
    if (!newFile) return;

    if (!props.spec.type.includes(newFile.type as any)) {
      //don't show cropper, render blank preview
      return props.on_change("invalid-type");
    }

    if (props.spec.max_size && size > props.spec.max_size) {
      return props.on_change("exceeds-size");
    }

    setFile(newFile);
    setOpenCropper(true);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    disabled: props.disabled,
    multiple: false,
    onDrop,
  });

  const styles = unpack(props.classes);
  const isLoading = props.value === "loading";
  const overlay = `before:content-[''] before:grid before:place-items-center before:absolute before:inset-0 data-[drag="true"]:before:bg-blue-l5 data-[loading="true"]:before:bg-blue-l5/90 data-[loading="true"]:before:content-['._._.'] before:text-xl before:font-bold `;

  async function handleSave(cropped: File) {
    setFile(cropped);
    setOpenCropper(false);
    if (props.spec.max_size && cropped.size > props.spec.max_size) {
      return props.on_change("exceeds-size");
    }

    try {
      props.on_change("loading");
      const url = await uploadFile(cropped);
      return props.on_change(url);
    } catch (err) {
      console.error(err);
      props.on_change("failure");
    }
  }

  return (
    <div className={`${styles.container} grid grid-rows-[1fr_auto]`}>
      <p className="text-xs text-gray dark:text-gray mb-2">
        <span>
          Valid types are:{" "}
          {props.spec.type
            .map((m) => m.split("/")[1].toUpperCase().replace(/\+xml/gi, ""))
            .join(", ")}
          .{" "}
          {props.spec.max_size ? (
            <>
              Image should be less than {props.spec.max_size / BYTES_IN_MB}MB in
              size.
              <br />
              {file?.size
                ? `Current image size: ${humanize(file.size / BYTES_IN_MB)}MB.`
                : ""}
            </>
          ) : (
            ""
          )}
        </span>{" "}
        <AspectTooltip aspect={props.spec.aspect} />
      </p>
      {file && (
        <ImgCropper
          classes={
            props.spec.rounded ? "[&_.cropper-view-box]:rounded-full" : ""
          }
          isOpen={openCropper}
          input={file}
          aspect={props.spec.aspect}
          onSave={handleSave}
          onClose={() => {
            setFile(undefined);
            setOpenCropper(false);
          }}
        />
      )}
      <div
        data-loading={props.value === "loading"}
        data-invalid={!!props.error}
        data-drag={isDragActive}
        data-disabled={props.disabled || props.value === "loading"}
        {...getRootProps({
          className: `relative ${overlay} ${styles.dropzone} group rounded border border-gray-l2 border-dashed 
          focus:outline-hidden focus:ring-2 data-[drag="true"]:ring-2 has-active:ring-2 ring-blue-d1 ring-offset-2 
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
        {!preview ? (
          <div
            className="absolute-center relative grid justify-items-center text-sm text-gray dark:text-gray select-none"
            tabIndex={-1}
          >
            <input {...getInputProps()} className="absolute inset-0" />
            <ArrowUpFromLine size={22} className="mb-[1.125rem]" />
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
              <ArrowUpFromLine size={15} />
            </div>
            {
              /** only show controls if new file is uploaded */
              (file || props.value === "invalid-type") && !isLoading && (
                <IconButton
                  disabled={props.disabled}
                  onClick={(e) => {
                    setFile(undefined);
                    props.on_undo(e);
                  }}
                >
                  <Undo size={18} />
                </IconButton>
              )
            }
            {file && !props.error && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenCropper(true);
                }}
                disabled={props.disabled}
              >
                <Crop size={16} />
              </IconButton>
            )}
          </div>
        )}
      </div>

      <span className="empty:hidden text-red dark:text-red-l2 text-xs mt-1">
        {props.error}
      </span>
    </div>
  );
}

export const ImgEditor = fixedForwardRef(_ImgEditor);

const buttonStyle =
  "cursor-pointer text-white text-lg bg-blue hover:bg-blue-l1 disabled:bg-gray-l2 p-2 m-1 rounded-md shadow-lg";
function IconButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} type="button" className={buttonStyle} />;
}
