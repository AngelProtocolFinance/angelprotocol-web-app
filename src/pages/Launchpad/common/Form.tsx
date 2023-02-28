import { FC, FormHTMLAttributes, PropsWithChildren } from "react";

export type FormProps = FormHTMLAttributes<HTMLFormElement>;
type Props = PropsWithChildren<{ className?: string }>;

const Form: FC<FormProps> = ({ className, ...props }) => {
  return (
    <form
      {...props}
      className={`${className} w-full bg-white dark:bg-blue-d6`}
    />
  );
};

const Title: FC<Props> = ({ className = "", children }) => {
  return (
    <h2
      className={`${className} font-bold text-center sm:text-left text-xl mb-2`}
    >
      {children}
    </h2>
  );
};

const Desc: FC<Props> = ({ className = "", children }) => {
  return (
    <p className={`${className} text-center sm:text-left text-lg leading-snug`}>
      {children}
    </p>
  );
};

const Group: FC<Props> = ({ className = "", children }) => {
  return (
    <div
      className={`${className} grid content-start border border-prim p-8 rounded`}
    >
      {children}
    </div>
  );
};

const GroupTitle: FC<Props> = ({ className = "", children }) => {
  return <div className={`${className} text-xl font-bold `}>{children}</div>;
};

export { Form as default, Title, Desc, Group, GroupTitle };
