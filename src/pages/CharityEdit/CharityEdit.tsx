import { useParams } from "react-router-dom";
import { useProfile } from "services/aws/endowments/queriers";
import CharityEditor from "./CharityEditor";
import EditForm from "./EditForm";
import { CharityParam } from "./types";
import ContentLoader from "components/ContentLoader/ContentLoader";
import Icon from "components/Icons/Icons";
import useWalletContext from "hooks/useWalletContext";

export default function CharityEdit() {
  const { wallet } = useWalletContext();
  const { address: endowment_addr } = useParams<CharityParam>();
  const { profile, isProfileLoading, isProfileError } = useProfile(
    endowment_addr!
  );

  const isEndowmentOwner = wallet?.address === profile.charity_owner;

  const {
    //TODO: make EditableAttr warn if omitted types are not removed
    //EditableAttr only warns if required attr is omitted
    charity_owner, //terra
    endowment_address, //terra
    total_liq,
    total_lock,
    overall,
    charity_programs, //content
    news_media_articles, //content
    ...editableAttr
  } = profile;

  if (!wallet)
    return <FormError message="Please connect wallet to view this page" />;
  if (isProfileLoading) return <FormSkeleton />;
  if (isProfileError) return <FormError message="Failed to load profile" />;
  if (!isEndowmentOwner)
    return <FormError message="You are not authorized to view this page" />;

  return (
    <div className="grid padded-container justify-items-center">
      <CharityEditor {...editableAttr}>
        <EditForm />
      </CharityEditor>
    </div>
  );
}

function FormError(props: { message: string }) {
  return (
    <div className="grid padded-container place-items-center content-center">
      <p className="flex gap-2 items-center text-red-400/90">
        <Icon type="Warning" />
        <span>{props.message}</span>
      </p>
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="grid padded-container justify-items-center">
      <div className="grid content-start gap-4 max-w-3xl w-full opacity-20">
        <ContentLoader className="h-12 w-30 rounded-md" />
        <ContentLoader className="h-52 w-full rounded-md" />
        <ContentLoader className="h-12 w-full rounded-md" />
        <ContentLoader className="h-12 w-full rounded-md" />
        <ContentLoader className="h-12 w-full rounded-md" />
        <ContentLoader className="h-12 w-full rounded-md" />
        <ContentLoader className="h-12 w-full rounded-md" />
        <ContentLoader className="h-12 w-full rounded-md" />
      </div>
    </div>
  );
}
