import { ToastContentProps, toast } from "react-toastify";
import { InstallLink } from "./types";
import ExtLink from "components/ExtLink";
import Icon from "components/Icon";

export default function Installer({
  data,
  closeToast,
}: ToastContentProps<InstallLink>) {
  const { name, url, logo } = data!;
  return (
    <div className="grid text-gray-d2 dark:text-white">
      <ExtLink
        className="rounded border border-prim p-2 flex items-center hover:text-blue dark:hover:text-blue-l2"
        href={url}
      >
        <img
          src={logo}
          alt="wallet logo"
          className="w-6 h-6 rounded-full object-contain mr-2"
        />
        <span className="">Install {name}</span>
        <Icon className="ml-auto" type="ExternalLink" size={18} />
      </ExtLink>
      <div className="text-xs mt-2 ml-1 text-gray-d1 dark:text-gray">
        You may need to refresh the page once you have downloaded the wallet.
      </div>
      <button
        type="button"
        onClick={closeToast}
        className="btn-orange text-xs px-3 py-0.5 rounded-sm justify-self-end mt-4"
      >
        dismiss
      </button>
    </div>
  );
}

export function openInstaller(link: InstallLink) {
  return toast.info(Installer, {
    icon: false,
    data: link,
    className: "",
    autoClose: false,
    closeButton: false,
  });
}
