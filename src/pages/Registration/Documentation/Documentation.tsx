import { useGetter } from "store/accessors";
import Button from "../Button";
import AuthorityToCreateCheckbox from "./AuthorityToCreateCheckbox";
import PrivacyPolicyCheckbox from "./PrivacyPolicyCheckbox";

export default function Documentation() {
  const user = useGetter((state) => state.user);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex w-full justify-between">
        <div>upload</div>
        <div>levels</div>
      </div>
      <div className="flex flex-col w-full text-left text-sm">
        <AuthorityToCreateCheckbox charityName={user.CharityName} />
        <PrivacyPolicyCheckbox />
      </div>
      <Button className="w-40 h-10 mt-5 bg-yellow-blue">Upload</Button>
    </div>
  );
}
