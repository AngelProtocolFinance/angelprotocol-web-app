import DesktopProfile from "./DesktopProfile";
import ProfileProvider from "./ProfileProvider";

export default function Profile() {
  return (
    <ProfileProvider>
      <DesktopProfile />
    </ProfileProvider>
  );
}
