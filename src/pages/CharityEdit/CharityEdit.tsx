import { RouteComponentProps } from "react-router-dom";
import { useProfile } from "services/aws/endowments/queriers";
import Loader from "components/Loader/Loader";
import CharityEditor from "./CharityEditor";
import EditForm from "./EditForm";
import { CharityParam } from "./types";
import { EditableProfileAttr } from "services/aws/endowments/types";

export default function CharityEdit(props: RouteComponentProps<CharityParam>) {
  const endowment_addr = props.match.params.address;
  const { profile, isProfileLoading, isProfileError } =
    useProfile(endowment_addr);
  const {
    //TODO: make EditableAttr warn if omitted types are not removed
    //EditableAttr only warns if required attr is omitted
    url,
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
