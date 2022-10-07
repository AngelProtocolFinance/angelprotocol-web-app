import Header from "./Header";
import useMenuModal from "./useMenuModal";

export default function MobileHeader() {
  const openMenu = useMenuModal();

  return (
    <header className="lg:hidden">
      <Header onMenuClick={openMenu} menuIconType="Menu" />
    </header>
  );
}
