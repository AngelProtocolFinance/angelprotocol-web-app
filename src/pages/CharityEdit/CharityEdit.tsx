import { useParams } from "react-router-dom";
import { useProfile } from "services/aws/endowments/queriers";
import Loader from "components/Loader/Loader";
import CharityEditor from "./CharityEditor";
import EditForm from "./EditForm";
import { CharityParam } from "./types";

export default function CharityEdit() {
  const { address: endowment_addr } = useParams<CharityParam>();
  const { profile, isProfileLoading, isProfileError } =
    useProfile(endowment_addr);
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

  if (isProfileLoading) {
    return (
      <Loader bgColorClass="bg-white-grey" gapClass="gap-4" widthClass="w-4" />
    );
  } else if (isProfileError) {
    return (
      <div className="grid place-items-center text-red-300">
        Failed to get profile data
      </div>
    );
  } else {
    return (
      <div className="grid padded-container justify-items-center">
        <CharityEditor {...editableAttr}>
          <EditForm />
        </CharityEditor>
      </div>
    );
  }
}
