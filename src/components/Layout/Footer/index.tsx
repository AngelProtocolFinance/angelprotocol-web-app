import NavMenu from "../NavMenu";

interface FooterProps {
  hasMenu: boolean;
}

const Footer = ({ hasMenu }: FooterProps) => {
  return (
    <footer>
      <nav className="container mx-auto flex justify-between items-center h-16 inset-x-0 bottom-0 object-bottom">
        <a href="/" className="font-sans text-2xs uppercase text-white">
          Copyright 2021 angelprotocol. All rights reserved.
        </a>
        {hasMenu && (
          <div className="flex font-sans text-base justify-end">
            <NavMenu />
          </div>
        )}
      </nav>
    </footer>
  );
};

export default Footer;
