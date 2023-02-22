import { useProfileQuery } from "services/aws/aws";
import ContentLoader from "components/ContentLoader";
import Icon from "components/Icon";
import APLogo from "components/Logo";
import Logo from "components/Logo";
import { useAdminResources } from "../Guard";

export default function Header() {
  const { id, type } = useAdminResources();
  const isCharity = type === "charity";

  const {
    data: profile,
    isLoading,
    isError,
  } = useProfileQuery(id, { skip: !isCharity });

  return (
    <div className="flex flex-col gap-1 w-full py-6 px-5 border-b border-prim">
      <div className="flex justify-between">
        {isCharity ? (
          <Logo
            className="w-14 h-14"
            logo={{ src: profile?.logo, isSrcLoading: isLoading }}
          />
        ) : (
          <APLogo className="w-32" />
        )}

        {isCharity &&
          (isLoading ? (
            <ContentLoader className="h-10 w-24" />
          ) : (
            <button
              type="button"
              className="btn-outline gap-2 normal-case h-10 pr-4 pl-3"
            >
              <Icon type="Sync" />
              Switch
            </button>
          ))}
      </div>

      <h5 className="text-sm font-bold truncate mt-2">
        {isCharity ? (
          isLoading ? (
            <ContentLoader className="h-5 w-full" />
          ) : isError || !profile ? (
            "Error loading endowment name"
          ) : (
            profile.name
          )
        ) : type === "ap" ? (
          "Angel Giving Team Admin"
        ) : (
          "Charity Applications Review"
        )}
      </h5>
      {/* <span className="text-xs truncate">
            juno1rhaasmvq6t3a607ua90ufrr8srkr08lxauqnpz
          </span> */}
    </div>
  );
}
