import {
  SCREEN_BREAKPOINTS,
  use_handle_screen_resize,
} from "hooks/use-handle-screen-resize";
import { Menu } from "lucide-react";
import { useState } from "react";
import { matchPath, useLocation } from "react-router";
import type { Link, LinkGroup } from "../types";

const DEFAULT_LINK: Link = {
  title: "Open Menu",
  icon: { fn: Menu, size: 24 },
  to: "",
};

export function use_sidebar_opener(
  link_groups: LinkGroup[],
  rootRoute: string
) {
  const [open, set_open] = useState(false);
  const curr_path = useLocation().pathname;

  // Explanation for the `reduce()` part:
  // Since `matchPath` returns all paths that match the pattern and that
  // includes all the parent paths, but we want to return only the "first parent" link
  // (the one with more path segments), we can find that "first parent" by simply checking the
  // `to` field length -> higher the length, more "recent" the parrent
  const active_link = link_groups
    .flatMap((g) => g.links)
    .reduce((prev, curr) => {
      const match = matchPath(`${rootRoute}${curr.to}/*`, curr_path);

      if (!match || prev.to.length > curr.to.length) {
        return prev;
      }

      return curr;
    }, DEFAULT_LINK);

  use_handle_screen_resize(
    (screen_size) => screen_size >= SCREEN_BREAKPOINTS.md && set_open(false),
    {
      debounce_time: 50,
      should_attach_listener: open,
    }
  );

  return { open, active_link, set_open };
}
