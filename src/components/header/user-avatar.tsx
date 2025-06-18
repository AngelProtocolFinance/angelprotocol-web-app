import { NavLink } from "@remix-run/react";
import { appRoutes } from "constants/routes";
import { CircleUserRound } from "lucide-react";

interface Props {
  avatar: string | undefined;
  classes?: string;
}

export function UserAvatar({ classes = "", avatar }: Props) {
  return (
    <NavLink
      to={`${appRoutes.user_dashboard}/edit-profile`}
      className={`[&:is(.pending)]:grayscale ${classes}`}
    >
      {avatar ? (
        <img src={avatar} className="rounded-full" height={32} width={32} />
      ) : (
        <CircleUserRound size={24} className="text-blue disabled:text-gray" />
      )}
    </NavLink>
  );
}
