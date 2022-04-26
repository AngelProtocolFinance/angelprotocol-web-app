import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { useMemberState } from "services/terra/admin/states";
import { useEndowmentBalance } from "services/terra/multicall/queriers";
import ContentLoader from "components/ContentLoader/ContentLoader";
import Icon from "components/Icons/Icons";
import useWithdrawer from "components/Transactors/Withdrawer/useWithdrawer";
import { app, site } from "constants/routes";
import Summary from "./Summary";
import Transactions from "./Transactions";

export default function Dashboard(props: { endowmentAddr: string }) {
  const { endowmentBalance, isLoading, isError } = useEndowmentBalance(
    props.endowmentAddr
  );
  const { member } = useMemberState();
  const showWithdraw = useWithdrawer(props.endowmentAddr);

  if (isLoading) return <DashboardSkeleton />;
  if (isError || !endowmentBalance) {
    return (
      <PageError
        classes="place-self-start justify-self-center mt-10 "
        redirect={{
          to: `${site.app}/${app.charity}/${props.endowmentAddr}`,
          title: "back to profile",
        }}
      >
        Failed to load page
      </PageError>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3 content-start justify-center">
      <Summary
        type="liquid"
        balance={endowmentBalance!.liquid}
        opener={showWithdraw}
        isOwner={!!member.weight}
      />
      <Summary type="locked" balance={endowmentBalance!.locked} />
      <Transactions endowmentAddress={props.endowmentAddr} />
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 content-start justify-center opacity-10">
      <ContentLoader className="w-full h-52 rounded-md" />
      <ContentLoader className="w-full h-52 rounded-md" />
      <ContentLoader className="w-full col-span-2 h-full" />
    </div>
  );
}

function PageError(
  props: PropsWithChildren<{
    classes?: string;
    redirect?: { to: string; title: string };
  }>
) {
  return (
    <div
      className={`${
        props.classes || ""
      } bg-white min-h-[10rem] min-w-[20rem] grid content-center place-items-center rounded-md gap-2`}
    >
      <Icon type="Warning" size={25} className="text-red-400/90" />
      <p className="text-red-400/90">{props.children}</p>
      {props.redirect && (
        <Link
          className="text-sm text-angel-blue hover:text-blue-accent"
          to={props.redirect.to}
        >
          {props.redirect.title}
        </Link>
      )}
    </div>
  );
}
