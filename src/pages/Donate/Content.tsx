import { useEffect } from "react";
import Breadcrumbs from "components/Breadcrumbs";
import { Steps } from "components/donation";
import { useSetter } from "store/accessors";
import { DonationRecipient, setRecipient } from "slices/donation";
import { appRoutes } from "constants/routes";

export default function Page(props: DonationRecipient) {
  const dispatch = useSetter();

  useEffect(() => {
    dispatch(setRecipient(props));
  }, [dispatch, props]);

  return (
    <div className="justify-self-center grid padded-container max-w-[35rem] py-8 sm:py-20">
      <Breadcrumbs
        className="font-body font-normal text-sm justify-self-start sm:justify-self-auto mb-10 sm:mb-12"
        items={[
          { title: "Marketplace", to: appRoutes.marketplace },
          {
            title: props.name,
            to: `${appRoutes.profile}/${props.id}`,
          },
          {
            title: "Donate",
            to: `${appRoutes.donate}/${props.id}`,
          },
        ]}
      />

      <Steps />
    </div>
  );
}
