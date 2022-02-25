import {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  PropsWithChildren,
} from "react";

export type CheckboxProps = PropsWithChildren<
  InputHTMLAttributes<HTMLInputElement> & {
    error?: string;
    centerError?: true | boolean;
  }
>;

const Checkbox = forwardRef(
  (props: CheckboxProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { error, centerError, children, ...rest } = props;
    const id = rest.id || rest.name;

    const errorPositionClasses = centerError
      ? "left-1/2 transform -translate-x-1/2"
      : "left-5";

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
        <Error message={error} positionClasses={errorPositionClasses} />
      </div>
    );
  }
);

type ErrorProps = { message?: string; positionClasses: string };

function Error({ message, positionClasses }: ErrorProps) {
  if (!message) return null;
  const className = `text-sm text-failed-red absolute -bottom-4 ${positionClasses}`;
  return <p className={className}>{message}</p>;
}

export default Checkbox;
