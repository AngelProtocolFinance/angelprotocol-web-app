import { forwardRef, InputHTMLAttributes, PropsWithChildren } from "react";

export type CheckboxProps = PropsWithChildren<
  InputHTMLAttributes<HTMLInputElement> & {
    error?: string;
    centerError?: true | boolean;
  }
>;

const Checkbox = forwardRef((props: CheckboxProps, ref: any) => {
  const { error, centerError, children, ...rest } = props;
  const id = rest.id || rest.name;

  return (
    <div className="flex gap-2 items-center relative">
      <input
        id={id}
        ref={ref}
        type="checkbox"
        className="cursor-pointer"
        {...rest}
      />
      <label htmlFor={id} className="cursor-pointer">
        {children}
      </label>
      {error && (
        <p
          className={`text-sm text-failed-red absolute -bottom-4 ${
            centerError ? "left-1/2 transform -translate-x-1/2" : "left-5"
          }`}
        >
          {error}
        </p>
      )}
    </div>
  );
});

export default Checkbox;
