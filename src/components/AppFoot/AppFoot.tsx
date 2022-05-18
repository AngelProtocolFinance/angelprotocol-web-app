import AppMenu from "components/AppFoot/AppMenu";
import Icon from "components/Icon";
import { LITEPAPER, SOCIAL_MEDIA_LINKS } from "constants/urls";

export default function AppFoot() {
  return (
    <footer className="w-full grid place-items-center bg-gray-900">
      <div className="w-full  py-2 flex flex-col items-center lg:flex-row lg:items-center lg:justify-between padded-container">
        <nav className="flex lg:items-center mb-2 lg:mb-0 lg:order-2">
          <AppMenu />
        </nav>
        <div className="flex flex-col items-center">
          <ul className="flex">
            {SOCIAL_MEDIA_LINKS.map(
              ({ id, iconType, textColor, link, title }) => {
                return (
                  <li key={id}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className={`${textColor} block m-2`}
                    >
                      <Icon type={iconType} className="w-8 h-8" title={title} />
                    </a>
                  </li>
                );
              }
            )}
          </ul>

          <a
            href={LITEPAPER}
            className="mt-2 mb-1 font-semibold text-xs uppercase text-white-grey text-center"
            target="_blank"
            rel="noreferrer"
          >
            Download Litepaper
          </a>
          <p className="text-white-grey text-center text-xs uppercase lg:order-1 lg:text-left ">
            Copyright 2021 Angel Protocol. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
