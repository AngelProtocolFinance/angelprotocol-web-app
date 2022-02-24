import {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  PropsWithChildren,
} from "react";

export type CheckboxProps = PropsWithChildren<
  InputHTMLAttributes<HTMLInputElement> & { error?: string }
>;

const Checkbox = forwardRef(
  (props: CheckboxProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { error, children, ...rest } = props;

    return (
      <div>
        <input
          id={rest.name}
          ref={ref}
          type="checkbox"
          className="mr-2 cursor-pointer"
          {...rest}
        />
        <label htmlFor={rest.name} className="cursor-pointer">
          {children}
        </label>
        {error && <p className="text-sm text-failed-red">{error}</p>}
      </div>
    );
  }
);

export default Checkbox;
