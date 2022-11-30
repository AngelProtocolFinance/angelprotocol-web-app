import { useFormContext } from "react-hook-form";
import { FormValues as FV, Props } from "../types";
import { useModalContext } from "contexts/ModalContext";
import Checkbox from "components/Checkbox";
import CountrySelector from "components/CountrySelector";
import ExtLink from "components/ExtLink";
import Icon from "components/Icon";
import { BtnPrimary } from "components/donation";
import { BtnOutline } from "components/donation/BtnOutline";
import { Label } from "components/form";
import { TERMS_OF_USE } from "constants/urls";
import Controls from "./Controls";
import TextInput, { errorStyle } from "./TextInput";
import Tooltip from "./Tooltip";
import useSubmit from "./useSubmit";

export const formStyle =
  "w-full bg-gray-l5 dark:bg-blue-d5 text-gray-d2 dark:text-white font-work";

export default function Form({ classes = "", ...props }: Props) {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<FV>();
  const submit = useSubmit(props);
  const isPostKyc = props.type === "post-donation";
  const { closeModal } = useModalContext();

  return (
    <div className="flex flex-col">
      <div className="relative">
        <div className="text-xl font-extrabold text-center border-b bg-orange-l6 dark:bg-blue-d7 border-gray-l2 dark:border-bluegray p-5">
          Get Receipt
          <Tooltip
            {...props}
            classes={`${isPostKyc ? "" : "mb-12"} col-span-full`}
          />
        </div>
        <button
          onClick={() => closeModal()}
          className="absolute right-4 top-3 border border-gray-l2 dark:border-bluegray p-2 rounded-md"
        >
          <Icon type="Close" size={24} />
        </button>
      </div>
      <div className="w-full text-lg font-extrabold p-5 bg-white dark:bg-blue-d6 text-gray-d2 dark:text-white">
        Please fill in your personal information below if you want to get a tax
        receipt.
      </div>
      <form
        onSubmit={handleSubmit(submit)}
        className={`${classes} ${formStyle}`}
        autoComplete="off"
        autoSave="off"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-5">
          <TextInput<FV>
            name="email"
            label="Email address"
            placeholder="e.g. johndoe@mail.com"
            classes={{ container: "col-span-full" }}
          />
          <TextInput<FV>
            name="name.first"
            label="First name"
            placeholder="e.g. John"
          />
          <TextInput<FV>
            name="name.last"
            label="Last name"
            placeholder="e.g. Doe"
          />
          <TextInput<FV>
            name="address.street"
            label="Address"
            placeholder="e.g. Street Rd 9920"
          />
          <TextInput<FV>
            name="address.complement"
            label="Address complement"
            placeholder="e.g. Street Rd 9920"
            required={false}
          />
          <TextInput<FV> name="city" label="City" placeholder="e.g. London" />
          <TextInput<FV>
            name="postalCode"
            label="Zip code"
            placeholder="e.g. 1080"
          />
          <div className="grid relative">
            <Label htmlFor="country" className="mb-2">
              Country
            </Label>

            <CountrySelector<FV, "country">
              placeholder="United Kingdom"
              fieldName="country"
              classes={{
                container:
                  "px-4 border border-gray-l2 dark:border-bluegray rounded focus-within:border-gray-d1 focus-within:dark:border-blue-l2 dark:border-bluegray bg-gray-l5 dark:bg-blue-d6",
                input:
                  "py-3.5 w-full placeholder:text-sm placeholder:text-gray-d1 dark:placeholder:text-gray focus:outline-none bg-transparent",
                error: errorStyle,
              }}
            />
          </div>
          <TextInput<FV>
            name="state"
            label="State"
            required={false}
            placeholder="e.g. England"
          />

          <Checkbox<FV>
            name="hasAgreedToTerms"
            classes={{
              container: `${isPostKyc ? "my-2" : "my-12"} col-span-full`,
              checkbox:
                "appearance-none border relative border-gray-d2 dark:border-white rounded w-6 h-6 checked:before:content-['✓'] before:absolute-center before:text-xl focus:outline-none focus:ring-2 focus:ring-orange",
              error: "mt-2",
            }}
          >
            I declare that I have read and agreed to{" "}
            <ExtLink className="underline text-orange" href={TERMS_OF_USE}>
              Privacy Policy *
            </ExtLink>
          </Checkbox>
          <Checkbox<FV>
            name="agreedToGetUpdates"
            classes={{
              container: `${isPostKyc ? "my-2" : "my-12"} col-span-full`,
              checkbox:
                "appearance-none border relative border-gray-d2 dark:border-white rounded w-6 h-6 checked:before:content-['✓'] before:absolute-center before:text-xl focus:outline-none focus:ring-2 focus:ring-orange",
              error: "mt-2",
            }}
          >
            I would like to receive communications from Angel Protocol and/or
            their affiliated non-profits with latest news and progress updates.
          </Checkbox>
        </div>
        <div className="grid grid-cols-2 sm:flex sm:w-full sm:justify-end bg-orange-l6 dark:bg-blue-d7 border-t border-gray-l2 dark:border-bluegray p-5">
          <BtnOutline
            onClick={() => closeModal()}
            type="button"
            className="px-10 mr-4 uppercase"
          >
            Cancel
          </BtnOutline>
          {props.type === "post-donation" ? (
            <BtnPrimary
              disabled={isSubmitting}
              type="submit"
              className="px-10 uppercase"
            >
              {isSubmitting ? "Processing..." : "Submit"}
            </BtnPrimary>
          ) : (
            <Controls {...props} classes="col-span-full" />
          )}
        </div>
      </form>
    </div>
  );
}
