const Footer = () => {
  return (
    <footer>
      <nav className="container mx-auto flex justify-between items-center h-16 px-4 bg-angel-protocol-dark-blue fixed inset-x-0 bottom-0 object-bottom">
        <a href="/" className="font-sans text-2xs uppercase text-white">
          Copyright 2021 angelprotocol. All rights reserved.
        </a>
        <ul className="flex font-montserrat text-base">
          <li className="mr-4">
            <a href="#" className="uppercase text-white">
              About Us
            </a>
          </li>
          <li className="mr-4">
            <a href="#" className="uppercase text-white">
              Donate Now
            </a>
          </li>
          <li className="mr-4">
            <a href="#" className="uppercase text-white">
              For Charities
            </a>
          </li>
          <li>
            <a href="#" className="uppercase text-white">
              About UNSDGs
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
