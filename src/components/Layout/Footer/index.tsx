const Footer = () => {
  const currentDate = new Date();

  return (
    <footer>
      <nav className="container mx-auto flex justify-between items-center h-16 px-4 bg-footer fixed bottom-0">
        <a href="/" className="font-sans text-small uppercase text-white">
          Copyright 2021 angelprotocol. All rights reserved.
        </a>
        <ul className="flex font-montserrat text-mid">
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
