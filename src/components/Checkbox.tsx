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

    return (
      <div className="flex flex-col text-sm">
        <div className="flex gap-2 items-center ">
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
        </div>
        <Error message={error} center={centerError} />
      </div>
    );
  }
);

type ErrorProps = { message?: string; center?: true | boolean };

function Error({ message, center }: ErrorProps) {
  if (!message) return null;
  const className = `w-full text-failed-red ${
    center ? "text-center" : "text-left ml-5"
  }`;
  return <p className={className}>{message}</p>;
}

export default Checkbox;
