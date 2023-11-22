import { signInWithRedirect } from "aws-amplify/auth";
import { useErrorContext } from "contexts/ErrorContext";
import Icon from "components/Icon";
import { OAUTH_PATH_STORAGE_KEY } from "constants/auth";

type Props = {
  from: string;
  setIsRedirecting: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Google({ setIsRedirecting, from }: Props) {
  const { handleError } = useErrorContext();
  return (
    <button
      onClick={async () => {
        try {
          setIsRedirecting(true);

          /** could be set by custom state, but state is nowhere to be found in redirect url search params,
          instead it is in hub event instead which defeats the purpose of redirectURLds
          https://docs.amplify.aws/javascript/build-a-backend/auth/add-social-provider/#add-custom-state
          */
          localStorage.setItem(OAUTH_PATH_STORAGE_KEY, from);
          await signInWithRedirect({
            provider: "Google",
          });
        } catch (err) {
          handleError(err);
          setIsRedirecting(false);
        }
      }}
      type="button"
      className="dark:bg-white dark:border-white rounded border-2 border-[#DB4437] enabled:hover:bg-[#DB4437]/10 text-[#DB4437] disabled:text-gray-l1 dark:disabled-text-gray disabled:border-gray-l2 dark:disabled:border-bluegray disabled:pointer-events-none p-2 flex items-center justify-center gap-2 uppercase font-bold text-sm"
    >
      <Icon size={24} type="Google" />
      <span>Signin with google</span>
    </button>
  );
}
