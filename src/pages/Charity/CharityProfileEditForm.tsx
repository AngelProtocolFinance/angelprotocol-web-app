import Action from "components/ActionButton/Action";
import { useSetModal } from "components/Nodal/Nodal";
import { DropzoneArea } from "material-ui-dropzone";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Profile, ProfileUpdateProps } from "services/aws/endowments/types";
import useUpdateEndowmentProfile from "./useUpdateEndowmentProfile";

function FormLabel({ title, htmlFor }: any) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-angel-grey text-md uppercase font-semibold mb-1"
    >
      {title}
    </label>
  );
}

export default function CharityProfileEditForm(props: ProfileUpdateProps) {
  const { setValue, register, handleSubmit } = useFormContext<Profile>();
  const { hideModal } = useSetModal();
  const [formLoading, setFormLoading] = useState(false);
  const { saveEndowmentProfile, readFileToBase64 } =
    useUpdateEndowmentProfile();
  const [openBannerDropzone, setOpenBannerDropzone] = useState(
    props.profile.charity_image && true
  );

  const onSubmit = async (body: any) => {
    setFormLoading(true);
    const updated = await saveEndowmentProfile(
      body,
      props.profile.endowment_address,
      props.profile.charity_owner
    );
    setFormLoading(false);
    if (updated) {
      hideModal();
    }
  };

  const readFiles = async (files: any) => {
    let content: any;
    if (files && files.length > 0) {
      content = await readFileToBase64(files[0]);
      setValue("charity_image", content);
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data))}
      className="bg-white grid gap-4 p-4 rounded-md w-full max-w-lg"
      autoComplete="off"
    >
      <h1 className="font-heading text-lg font-semibold text-grey-600">
        Update Profile
      </h1>
      <div className="grid">
        <FormLabel title="Email" htmlFor="charity_email" />
        <input
          {...register("charity_email")}
          autoComplete="off"
          id="charity_email"
          type="text"
          placeholder="Email"
          className="p-1 pl-0 outline-none border-2  border-dark-grey border-opacity-60 text-dark-grey text-xl pl-2 rounded-xl"
        />
      </div>
      <div className="grid">
        <FormLabel title="Name" htmlFor="charity_name" />
        <input
          {...register("charity_name")}
          autoComplete="off"
          id="charity_name"
          type="text"
          placeholder="Name"
          className="p-1 pl-0 outline-none border-2  border-dark-grey border-opacity-60 text-dark-grey text-xl pl-2 rounded-xl"
        />
      </div>
      <div className="grid">
        <FormLabel title="Overview" htmlFor="charity_overview" />
        <textarea
          {...register("charity_overview")}
          autoComplete="off"
          id="charity_overview"
          placeholder="Name"
          className="p-1 pl-0 outline-none border-2  border-dark-grey border-opacity-60 text-dark-grey text-xl pl-2 rounded-xl"
        />
      </div>
      <div className="grid">
        <FormLabel title="Country" htmlFor="country_city_origin" />
        <input
          {...register("country_city_origin")}
          autoComplete="off"
          id="country_city_origin"
          type="text"
          placeholder="Name"
          className="p-1 pl-0 outline-none border-2  border-dark-grey border-opacity-60 text-dark-grey text-xl pl-2 rounded-xl"
        />
      </div>
      <div className="grid">
        <FormLabel title="No of Employees" htmlFor="number_of_employees" />
        <input
          {...register("number_of_employees")}
          autoComplete="off"
          id="number_of_employees"
          type="text"
          placeholder="Name"
          className="p-1 pl-0 outline-none border-2  border-dark-grey border-opacity-60 text-dark-grey text-xl pl-2 rounded-xl"
        />
      </div>
      <div className="grid">
        <FormLabel title="Facebook" htmlFor="facebook_page" />
        <input
          {...register("facebook_page")}
          autoComplete="off"
          id="facebook_page"
          type="text"
          placeholder="Name"
          className="p-1 pl-0 outline-none border-2  border-dark-grey border-opacity-60 text-dark-grey text-xl pl-2 rounded-xl"
        />
      </div>
      <div className="grid">
        <FormLabel title="Linkedin" htmlFor="linkedin_page" />
        <input
          {...register("linkedin_page")}
          autoComplete="off"
          id="linkedin_page"
          type="text"
          placeholder="Name"
          className="p-1 pl-0 outline-none border-2  border-dark-grey border-opacity-60 text-dark-grey text-xl pl-2 rounded-xl"
        />
      </div>
      <div className="grid">
        <FormLabel title="Twitter" htmlFor="twitter_handle" />
        <input
          {...register("twitter_handle")}
          autoComplete="off"
          id="twitter_handle"
          type="text"
          placeholder="Name"
          className="p-1 pl-0 outline-none border-2  border-dark-grey border-opacity-60 text-dark-grey text-xl pl-2 rounded-xl"
        />
      </div>
      <div className="w-full">
        <div className="item mb-5">
          <p className="text-sm text-gray-400 font-bold mb-1 text-left">
            Charity Image{" "}
            <span className="ml-1 text-xs text-failed-red">*</span>
          </p>
          {openBannerDropzone ? (
            <div className="flex items-end">
              <img
                src={props.profile?.charity_image}
                width={160}
                height={160}
                className="rounded-full mr-10 h-40"
                alt="banner"
              />
              <Action
                classes="bg-yellow-blue w-36 h-8 text-xs"
                onClick={() => setOpenBannerDropzone(false)}
                title="Change Image"
                // disabled={!openDropzone}
              />
            </div>
          ) : (
            <div className="form-control rounded-md flex justify-between items-center w-full h-64">
              <DropzoneArea
                onChange={(files: any) => readFiles(files)}
                dropzoneClass="text-gray-400"
                filesLimit={1}
                acceptedFiles={["image/*"]}
              />
            </div>
          )}
          {/* <p className="text-xs sm:text-sm text-failed-red mt-1 pl-1">
            {errors.Banner?.message}
          </p> */}
        </div>
      </div>
      <button
        disabled={formLoading}
        className="bg-angel-orange disabled:bg-grey-accent p-1 rounded-md mt-2 uppercase text-md text-white font-bold"
        type="submit"
      >
        {formLoading ? "updating..." : "update"}
      </button>
    </form>
  );
}
