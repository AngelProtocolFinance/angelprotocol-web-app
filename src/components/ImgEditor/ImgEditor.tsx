import Icon from "components/Icon";
import { humanize, unpack } from "helpers";
import { fixedForwardRef } from "helpers/react";
import type React from "react";
import { useDropzone } from "react-dropzone";
import {
  type FieldValues,
  type Path,
  get,
  useController,
  useFormContext,
} from "react-hook-form";
import type { ControlledProps, Props } from "./types";
import useImgEditor from "./useImgEditor";

const BYTES_IN_MB = 1e6;

function _ImgEditor(props: ControlledProps, ref: React.Ref<HTMLInputElement>) {
  const { handleOpenCropper, onDrop } = useImgEditor(props);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    disabled: props.disabled,
    multiple: false,
    onDrop,
  });

  const styles = unpack(props.classes);

  const overlay = `before:content-[''] before:absolute before:inset-0 data-[drag="true"]:before:bg-blue-l5 `;

  return (
    <div className={`${styles.container} grid grid-rows-[1fr_auto]`}>
      <div
        data-invalid={!!props.error}
        data-drag={isDragActive}
        data-disabled={props.disabled}
        {...getRootProps({
          className: `relative ${overlay} ${styles.dropzone} group rounded border border-gray-l2 border-dashed 
          focus:outline-none focus:ring-2 data-[drag="true"]:ring-2 has-[:active]:ring-2 ring-blue-d1 ring-offset-2 
          hover:bg-blue-l5
          data-[disabled="true"]:bg-gray-l5 data-[disabled="true"]:pointer-events-none
          data-[invalid="true"]:border-red
          `,
          ref,
        })}
        style={{
          background: props.value.preview
            ? `url('${props.value.preview}') center/cover no-repeat`
            : undefined,
        }}
      >
        {!props.value.preview ? (
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
              props.value.file && (
                <IconButton disabled={props.disabled} onClick={props.onUndo}>
                  <Icon type="Undo" />
                </IconButton>
              )
            }
            {props.value.file && !props.error && (
              <IconButton onClick={handleOpenCropper} disabled={props.disabled}>
                <Icon type="Crop" />
              </IconButton>
            )}
          </div>
        )}
      </div>
      <p className="text-xs text-navy-l1 dark:text-navy-l2 mt-2">
        <span>
          Valid types are:{" "}
          {props.accept
            .map((m) => m.split("/")[1].toUpperCase().replace(/\+xml/gi, ""))
            .join(", ")}
          .{" "}
          {props.maxSize ? (
            <>
              Image should be less than {props.maxSize / BYTES_IN_MB}MB in size.
              <br />
              {props.value.file?.size
                ? `Current image size: ${humanize(
                    props.value.file?.size / BYTES_IN_MB
                  )}MB.`
                : ""}
            </>
          ) : (
            ""
          )}
        </span>{" "}
        <span className="empty:hidden text-red dark:text-red-l2 text-xs before:content-['('] before:mr-0.5 after:content-[')'] after:ml-0.5 empty:before:hidden empty:after:hidden">
          {props.error}
        </span>
      </p>
    </div>
  );
}

export const ControlledImgEditor = fixedForwardRef(_ImgEditor);

export default function ImgEditor<T extends FieldValues, K extends Path<T>>(
  props: Props<T, K>
) {
  const { name, ...rest } = props;
  const {
    trigger,
    resetField,
    formState: { errors, isSubmitting },
  } = useFormContext<T>();

  const {
    field: { value, onChange, ref },
  } = useController<T, typeof name>({
    name,
  });

  const filePath = `${name}.file`;

  return (
    <ControlledImgEditor
      ref={ref}
      value={value}
      onChange={(v) => {
        onChange(v);
        trigger(filePath as any);
      }}
      onUndo={(e) => {
        ////prevent container dropzone from catching click event
        e.stopPropagation();
        resetField(name);
      }}
      error={get(errors, filePath)?.message}
      disabled={isSubmitting}
      {...rest}
    />
  );
}

const buttonStyle =
  "cursor-pointer text-white text-lg bg-blue hover:bg-blue-l1 disabled:bg-gray-l2 p-2 m-1 rounded-md shadow-lg";
function IconButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} type="button" className={buttonStyle} />;
}
