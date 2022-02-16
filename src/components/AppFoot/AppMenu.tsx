import { PropsWithChildren } from "react";

export default function AppMenu() {
  return (
    <ul className="flex lg:items-center">
      <AppMenuItem href="https://share-eu1.hsforms.com/14aljI0OEQje2DDmJiZoLFgetp37">
        SUPPORT
      </AppMenuItem>
      <AppMenuItem href="https://share-eu1.hsforms.com/10igJPVeBQMemEpTmUsxSVwetp37">
        FEEDBACK
      </AppMenuItem>
      <AppMenuItem href="https://www.angelprotocol.io/contact">
        REGISTER
      </AppMenuItem>
    </ul>
  );
}

type Props = PropsWithChildren<{ href: string }>;

function AppMenuItem({ href, children }: Props) {
  return (
    <li>
      <a
        rel="noreferrer noopener"
        target="_blank"
        href={href}
        className="text-white-grey text-sm hover:text-opacity-75 px-1 lg:text-base font-heading uppercase font-semibold lg:px-2"
      >
        {children}
      </a>
    </li>
  );
}
