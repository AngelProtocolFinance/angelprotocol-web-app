const Footer = () => {
  const currentDate = new Date();

  return (
    <footer>
      <nav className="container mx-auto flex justify-between items-center h-16 px-4">
        <a href="/" className="font-regular text-xs">
          &copy; AngelProtocol 2021 — {currentDate.getFullYear()}
        </a>
        <ul className="flex font-regular text-base">
          <li className="mr-4">
            <a href="#">Terms &amp; Privacy</a>
          </li>
          <li className="mr-4">
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">About UNSDGs</a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
