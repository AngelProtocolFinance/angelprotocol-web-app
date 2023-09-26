import { PropsWithChildren } from "react";
import { AWSstrategy } from "types/aws";
import { useAdminContext } from "pages/Admin/Context";
import { useModalContext } from "contexts/ModalContext";
import ExtLink from "components/ExtLink";
import Icon from "components/Icon";
import { humanize } from "helpers";
import Investor from "./Investor";

export default function Strategy(props: AWSstrategy) {
  const {
    name,
    market_cap,
    description,
    provider,
    type,
    rating,
    apy,
    website,
  } = props;
  const { showModal } = useModalContext();
  const { id } = useAdminContext();

  return (
    <div className="@container border border-prim rounded bg-orange-l6 dark:bg-blue-d6">
      <p className="mx-6 mt-6 font-heading text-xl font-bold mb-2">{name}</p>
      <p className="text-sm text-gray-d1 dark:text-gray mx-6 mb-2 @lg:mb-3 line-clamp-3 @lg:line-clamp-none">
        {description}
      </p>
      <div className="flex flex-col @lg:flex-row justify-between items-start @lg:items-center mx-6 mb-6">
        <ExtLink
          href={website}
          className="text-sm text-gray-d1 dark:text-gray underline mb-5 @lg:mb-0"
        >
          {provider.name}
        </ExtLink>
        <span className="rounded-full bg-blue-l4 dark:bg-blue-d4 text-[0.6875rem] py-1 px-2 font-bold border border-prim">
          {type}
        </span>
      </div>
      <div className="border-t border-prim grid grid-cols-[repeat(3,auto)] @lg:flex gap-x-8 items-center p-6">
        <KeyVal title="Risk" tooltip="some tooltip">
          {rating}
        </KeyVal>
        <KeyVal title="APY" tooltip="some tooltip">
          {apy}%
        </KeyVal>
        <KeyVal title="Market Cap">{humanize(market_cap, 0)} USD</KeyVal>
        <button
          type="button"
          onClick={() => showModal(Investor, { strategy: props, endowId: id })}
          className="mt-6 @lg:mt-0 btn-outline-filled px-8 py-2 ml-auto w-full @lg:w-auto col-span-full"
        >
          invest
        </button>
      </div>
    </div>
  );
}

function KeyVal(props: PropsWithChildren<{ title: string; tooltip?: string }>) {
  return (
    <div className="grid gap-y-1">
      <p className="text-xs uppercase text-gray-d1 dark:text-gray">
        {props.title}{" "}
        {props.tooltip && (
          <Icon type="Question" className="relative inline bottom-px" />
        )}
      </p>
      <p className="font-bold font-heading text-sm order-first @lg:order-none">
        {props.children}
      </p>
    </div>
  );
}
