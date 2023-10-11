import { useAuthenticator } from "@aws-amplify/ui-react";
import Icon from "components/Icon";

export default function LogoutBtn() {
  const { signOut } = useAuthenticator((context) => [context.user]);
  return (
    <button
      type="button"
      onClick={signOut}
      className="flex items-center gap-2 text-left text-gray-d2 dark:text-gray hover:text-orange dark:hover:text-orange px-5 border-t border-prim font-bold text-sm py-4"
    >
      <Icon type="Logout" style={{ transform: "rotateY(180deg)" }} size={20} />
      <span>Logout</span>
    </button>
  );
}
