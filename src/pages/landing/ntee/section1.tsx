import Image from "components/image";
import { APP_NAME } from "constants/env";
import type { PageContext } from "./types";

interface Props extends PageContext {
  classes?: string;
}

export function Section1({ classes = "", ...props }: Props) {
  return (
    <div className={`${classes}`}>
      <div className="relative bg-white w-full max-w-3xl mx-auto p-8 rounded-xl shadow-xl">
        <h2 className="mb-8 text-center text-2xl @6xl:text-3xl @6xl:leading-tight text-gray-d4">
          Your current reality:
        </h2>
        <div className="grid @6xl:grid-cols-2 gap-y-8">
          <div>
            <p className="text-center text-2xl @6xl:text-3xl font-semibold text-red">
              $97,000
            </p>
            <p className="text-center">What you keep with fees</p>
          </div>
          <div>
            <p className="text-center text-2xl @6xl:text-3xl font-semibold text-blue">
              $100,000
            </p>
            <p className="text-center">What you keep with {APP_NAME}</p>
          </div>
        </div>
        <p className="text-center mt-8 text-gray-d1 text-sm">
          Based on $100,000 raised annually
        </p>
        <Image
          src={props.left}
          width={110}
          className="@max-xl:hidden absolute right-0 @5xl:-right-24 -bottom-12"
        />
        <Image
          src={props.right}
          width={110}
          className="@max-xl:hidden absolute left-0 @5xl:-left-24 -bottom-12"
        />
      </div>
    </div>
  );
}
