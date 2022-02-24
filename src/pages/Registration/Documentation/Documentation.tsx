import { HTMLAttributes, PropsWithChildren } from "react";
import { useGetter } from "store/accessors";
import Button from "../Button";
import AuthorityToCreateCheckbox from "./AuthorityToCreateCheckbox";
import LevelDescription from "./LevelDescription";
import PrivacyPolicyCheckbox from "./PrivacyPolicyCheckbox";

export default function Documentation() {
  const user = useGetter((state) => state.user);
  const currentLevel = 0;

  return (
    <div className="flex flex-col w-full h-full gap-8 items-center">
      <div className="flex flex-col w-full gap-2">
        <div className="grid grid-cols-32 gap-3 text-left">
          <Header>
            Please upload the following documentation. The documentation you
            provide will inform which Level your organization will be
          </Header>
          <Header>
            {`Currently, your organization is ${
              !!currentLevel ? `Level ${currentLevel}` : "not classified"
            }`}
          </Header>
        </div>
        <div className="grid grid-cols-32 gap-4">
          <div>uploads</div>
          <LevelDescription />
        </div>
      </div>
      <div className="flex flex-col w-full text-left text-sm">
        <AuthorityToCreateCheckbox charityName={user.CharityName} />
        <PrivacyPolicyCheckbox />
      </div>
      <Button className="w-40 h-10 bg-yellow-blue">Upload</Button>
    </div>
  );
}

const Header = ({
  children,
}: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) => (
  <h3 className="text-lg font-bold">{children}</h3>
);
