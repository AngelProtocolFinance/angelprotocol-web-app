import { laira } from "assets/laira/laira";
import Image from "components/image";
import { APP_NAME } from "constants/env";

interface Props {
  classes?: string;
}

export function Section1({ classes = "" }: Props) {
  return (
    <div className={classes}>
      <div className="relative w-full max-w-3xl mx-auto p-8 rounded-xl shadow-xl border-t border-gray-l5">
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
          src={laira.floating}
          width={150}
          className="@max-5xl:hidden absolute -right-24 top-0"
        />
        <Image
          src={laira.yellow}
          width={70}
          className="@max-5xl:hidden absolute -left-24"
        />
      </div>
    </div>
  );
}
