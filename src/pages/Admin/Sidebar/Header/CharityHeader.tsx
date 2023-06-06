import { useState } from "react";
import { useProfileQuery, useWalletProfileQuery } from "services/aws/aws";
import { useGetWallet } from "contexts/WalletContext";
import ContentLoader from "components/ContentLoader";
import Icon from "components/Icon";
import Image from "components/Image";
import { useAdminContext } from "../../Context";
import MyEndowments from "./MyEndowments";

export default function CharityHeader() {
  const { id } = useAdminContext();
  const { data: profile, isLoading, isError } = useProfileQuery(id);
  const { wallet } = useGetWallet();
  const { data } = useWalletProfileQuery(wallet?.address!, {
    skip: !wallet,
  });
  const [displayOtherEndowments, setDisplayOtherEndowments] = useState(false);
  return (
    <>
      <div className="flex justify-between">
        <Image
          className="w-14 h-14"
          src={profile?.logo}
          isSrcLoading={isLoading}
        />

        {isLoading ? (
          <ContentLoader className="h-10 w-24" />
        ) : wallet ? (
          <button
            type="button"
            className="btn-outline gap-2 normal-case h-10 pr-4 pl-3"
            onClick={() => setDisplayOtherEndowments(!displayOtherEndowments)}
            disabled={!data || data.admin.length === 1}
          >
            <Icon type="Sync" />
            Switch
          </button>
        ) : (
          <></>
        )}
      </div>
      <h5 className="text-sm font-bold truncate mt-2">
        {isLoading ? (
          <ContentLoader className="h-5 w-full" />
        ) : isError || !profile ? (
          "Error loading endowment name"
        ) : (
          profile.name
        )}
      </h5>
      <MyEndowments
        showEndowments={!!data && displayOtherEndowments}
        endowments={
          data ? data.admin.filter((endowment) => endowment.endowId !== id) : []
        }
      />
    </>
  );
}
