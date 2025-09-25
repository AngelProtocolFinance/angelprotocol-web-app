import { app_routes } from "constants/routes";
import { CircleUserRound } from "lucide-react";
import { NavLink } from "react-router";

interface Props {
  avatar: string | undefined;
  classes?: string;
}

export function UserAvatar({ classes = "", avatar }: Props) {
  return (
    <NavLink
      to={`${app_routes.user_dashboard}/edit-profile`}
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
