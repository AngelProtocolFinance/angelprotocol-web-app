import { createPortal } from "react-dom";
import { Bounce, ToastContainer, TypeOptions } from "react-toastify";
import Icon from "components/Icon";

export default function ToastPortal() {
  return createPortal(
    <ToastContainer
      closeButton={() => (
        <Icon
          type="Close"
          className="text-gray-d2 dark:text-white hover:text-orange hover:dark:text-orange pr-1 self-start shrink-0"
          size={22}
        />
      )}
      toastClassName={(options) =>
        `font-work text-sm bg-white dark:bg-blue-d7 border border-prim flex items-center ${textColor(
          options?.type
        )} p-2 rounded`
      }
      transition={Bounce}
      position="top-right"
      autoClose={2000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
    />,
    document.getElementsByTagName("body")[0]
  );
}

function textColor(type: TypeOptions | undefined) {
  switch (type) {
    case "info":
      return "text-blue dark:text-blue-l2";
    case "warning":
      return "text-orange-d1 dark:text-orange-l1";
    case "success":
      return "text-green dark:text-green-l2";
    case "error":
      return "text-red dark:text-red-l2";
    default:
      return "text-gray-d2 dark:text-white";
  }
}
