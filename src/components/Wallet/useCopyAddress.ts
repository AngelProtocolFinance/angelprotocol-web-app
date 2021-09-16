import useDropdownMenu from "react-accessible-dropdown-menu-hook";

export default function useCopyAddress() {
  const { buttonProps, isOpen } = useDropdownMenu(5);
  const handleCopy = (terraAddress: string) => () => {
    const selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = terraAddress;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
  };

  return { buttonProps, isOpen, handleCopy };
}
