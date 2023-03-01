import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { Steps } from "slices/launchpad/types";

export type SectionProps<T extends object> = {
  title: string;
  step: Steps;
  disabled: boolean;
} & T;

export default function Section({
  title,
  step,
  children,
  disabled,
}: PropsWithChildren<SectionProps<{}>>) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8 border-t border-prim pt-4">
        <h3 className="font-bold">{title}</h3>
        <Link
          to={step === 1 ? "../." : `../${step}`}
          aria-disabled={disabled}
          className="btn-outline-filled w-32 py-2 text-sm"
        >
          Change
        </Link>
      </div>
      {children}
    </div>
  );
}
