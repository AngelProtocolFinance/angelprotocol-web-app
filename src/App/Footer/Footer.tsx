import Navigation from "./Navigation";
import Socials from "./Socials";

export default function Footer() {
  return (
    <footer className="padded-container flex flex-col items-center justify-self-stretch bg-thin-blue">
      <Navigation />
      <div>
        <Socials />
        <p className="text-white-grey/70 text-center text-xs uppercase ">
          Copyright {new Date().getFullYear()} Angel Protocol. All rights
          reserved
        </p>
      </div>
    </footer>
  );
}
