import { matchPath, useLocation } from "@remix-run/react";
import useHandleScreenResize, {
  SCREEN_BREAKPOINTS,
} from "hooks/useHandleScreenResize";
import { Menu } from "lucide-react";
import { useState } from "react";
import type { Link, LinkGroup } from "../types";

const DEFAULT_LINK: Link = {
  title: "Open Menu",
  icon: { fn: Menu, size: 24 },
  to: "",
};

export default function useSidebarOpener(
  linkGroups: LinkGroup[],
  rootRoute: string
) {
  const [open, setOpen] = useState(false);
  const currPath = useLocation().pathname;

  // Explanation for the `reduce()` part:
  // Since `matchPath` returns all paths that match the pattern and that
  // includes all the parent paths, but we want to return only the "first parent" link
  // (the one with more path segments), we can find that "first parent" by simply checking the
  // `to` field length -> higher the length, more "recent" the parrent
  const activeLink = linkGroups
    .flatMap((g) => g.links)
    .reduce((prev, curr) => {
      const match = matchPath(`${rootRoute}${curr.to}/*`, currPath);

      if (!match || prev.to.length > curr.to.length) {
        return prev;
      }

      return curr;
    }, DEFAULT_LINK);

  useHandleScreenResize(
    (screenSize) => screenSize >= SCREEN_BREAKPOINTS.md && setOpen(false),
    {
      debounceTime: 50,
      shouldAttachListener: open,
    }
  );

  return { open, activeLink, setOpen };
}
