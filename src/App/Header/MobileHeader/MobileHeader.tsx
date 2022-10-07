import Content from "./Content";
import useMenuModal from "./useMenuModal";

export default function MobileHeader() {
  const openMenu = useMenuModal();

  return (
    <header className="lg:hidden">
      <Content onMenuClick={openMenu} menuIconType="Menu" />
    </header>
  );
}
