import React from "react";
import { FaFacebookSquare, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { CSSTransition } from "react-transition-group";
import {
  FACEBOOK_SHARE_URL,
  LINKEDIN_SHARE_URL,
  TWITTER_SHARE_URL,
} from "./shareUrls";
import "./styles.css";

type IconProps = {
  link: string;
  icon: React.ComponentType<any>;
};

const IconLink = ({ link, icon: Icon }: IconProps) => {
  return (
    <a
      href={link}
      target="_blank"
      className="flex justify-center items-center border-2 border-angel-blue hover:border-blue-accent hover:text-blue-accent rounded-full w-9 h-9"
    >
      <Icon size={20} />
    </a>
  );
};

function ShareSection({ isOpen }: any) {
  return (
    <CSSTransition in={isOpen} timeout={300} classNames="share" unmountOnExit>
      <div className="flex gap-2 text-angel-blue h-full">
        <IconLink link={TWITTER_SHARE_URL} icon={FaTwitter} />
        <IconLink link={LINKEDIN_SHARE_URL} icon={FaLinkedinIn} />
        <IconLink link={FACEBOOK_SHARE_URL} icon={FaFacebookSquare} />
      </div>
    </CSSTransition>
  );
}

export default ShareSection;
