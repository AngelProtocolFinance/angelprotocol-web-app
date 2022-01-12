import { useSetModal } from "components/Nodal/Nodal";
import { FormProvider, useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import { Profile } from "services/aws/endowments/types";

type CharityEditProps = { inModal: boolean; profile: Profile; children: any };

export default function CharityUpdateSuite(props: CharityEditProps) {
  const { hideModal } = useSetModal();
  const close = () => {
    hideModal();
  };

  /**
   * TODO:
   * 1. Add schema validation to this form component
   */
  const methods = useForm<Profile>({
    reValidateMode: "onChange",
    defaultValues: {
      charity_email: props.profile.charity_email,
      charity_name: props.profile.charity_name,
      charity_overview: props.profile.charity_overview,
      charity_programs: props.profile.charity_programs,
      country_city_origin: props.profile.country_city_origin,
      facebook_page: props.profile.facebook_page,
      linkedin_page: props.profile.linkedin_page,
      news_media_articles: props.profile.news_media_articles,
      number_of_employees: props.profile.number_of_employees,
      twitter_handle: props.profile.twitter_handle,
      charity_owner: props.profile.charity_owner,
      charity_image: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <div
        className={`max-w-md w-full max-h-75vh relative overflow-hidden overflow-y-scroll ${
          props.inModal ? "bg-white rounded-md pt-4" : ""
        }`}
      >
        {props.inModal && (
          <button
            onClick={close}
            className="absolute right-2 top-2 text-angel-grey hover:text-black"
          >
            <MdOutlineClose size={25} />
          </button>
        )}
        {props.children}
      </div>
    </FormProvider>
  );
}
