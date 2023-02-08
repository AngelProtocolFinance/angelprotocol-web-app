import { useProfileQuery } from "services/aws/aws";
import ContentLoader from "components/ContentLoader";
import Icon from "components/Icon";
import Logo from "components/Logo";

export default function Header({ endowId }: { endowId: number }) {
  const { data: profile, isLoading, isError } = useProfileQuery(endowId);

  return (
    <div className="flex flex-col gap-3 w-full py-6 px-5 border-b border-prim">
      <div className="flex justify-between">
        <Logo
          className="w-14 h-14"
          src={profile?.logo}
          isSrcLoading={isLoading}
        />

        {isLoading ? (
          <ContentLoader className="h-10 w-24" />
        ) : (
          <button
            type="button"
            className="btn-outline gap-2 normal-case h-10 pr-4 pl-3"
          >
            <Icon type="Sync" />
            Switch
          </button>
        )}
      </div>

      <div className="grid gap-1">
        <h5 className="text-sm font-bold truncate">
          {isLoading ? (
            <ContentLoader className="h-5 w-full" />
          ) : isError || !profile ? (
            "Error loading endowment name"
          ) : (
            profile.name
          )}
        </h5>
        {/* <span className="text-xs truncate">
            juno1rhaasmvq6t3a607ua90ufrr8srkr08lxauqnpz
          </span> */}
      </div>
    </div>
  );
}
