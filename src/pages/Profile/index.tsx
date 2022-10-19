import DesktopProfile from "./DesktopProfile";
import MobileProfile from "./MobileProfile";
import ProfileProvider from "./ProfileProvider";

export default function Profile() {
  return (
    <ProfileProvider>
      <DesktopProfile />
      <MobileProfile />
    </ProfileProvider>
  );
}
