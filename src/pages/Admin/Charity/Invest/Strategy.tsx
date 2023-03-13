import ExtLink from "components/ExtLink";
import { humanize } from "helpers";
import { TStrategy } from "./strats";

export default function Strategy({
  name,
  invested,
  description,
  provider,
  type,
}: TStrategy) {
  return (
    <div className="border border-prim rounded bg-orange-l6 dark:bg-blue-d6">
      <p className="mx-6 mt-6 font-heading text-xl font-bold mb-2">{name}</p>
      <p className="text-xs text-gray-d1 dark:text-gray mx-6 mb-3">
        {description}
      </p>
      <div className="flex justify-between items-center mx-6 mb-6">
        <ExtLink
          href={provider.url}
          className="text-xs text-gray-d1 dark:text-gray underline"
        >
          {provider.name}
        </ExtLink>
        <span className="rounded-full bg-blue-l4 text-[0.6875rem] py-1 px-2 font-bold border border-prim">
          {type}
        </span>
      </div>
      <div className="border-t border-prim flex justify-between p-6">
        <div>
          <p className="text-xs uppercase text-gray-d1 dark:text-gray mb-1">
            Current balance
          </p>
          <p className="font-bold font-heading text-sm">
            {humanize(invested)} USD
          </p>
        </div>
        <button
          type="button"
          onClick={() => alert("show invest form")}
          className="btn-outline-filled px-8 py-2"
        >
          invest
        </button>
      </div>
    </div>
  );
}
