import { useGetter } from "store/accessors";
import Button from "../Button";
import AuthorityToCreateCheckbox from "./AuthorityToCreateCheckbox";
import LevelDescription from "./LevelDescription";
import PrivacyPolicyCheckbox from "./PrivacyPolicyCheckbox";

export default function Documentation() {
  const user = useGetter((state) => state.user);

  return (
    <div className="flex flex-col w-full h-full gap-8 items-center">
      <div className="grid grid-cols-2 w-full justify-between">
        <div>upload</div>
        <LevelDescription />
      </div>
      <div className="flex flex-col w-full text-left text-sm">
        <AuthorityToCreateCheckbox charityName={user.CharityName} />
        <PrivacyPolicyCheckbox />
      </div>
      <Button className="w-40 h-10 bg-yellow-blue">Upload</Button>
    </div>
  );
}
