import Icon from "components/Icon";
import { useLocalContext } from "./LocalContext";

type Props = { className?: string };

export default function Logo({ className = "" }: Props) {
  const { profile } = useLocalContext();

  const logoStyle = `box-border h-44 w-44 border border-gray-l2 rounded-full bg-blue-l3 object-contain dark:bg-blue dark:border-blue-capital ${className}`;

  if (profile.logo) {
    return (
      <div className={`${logoStyle} flex items-center justify-center`}>
        <Icon type="Picture" className="w-9 h-9 text-white dark:text-blue-l3" />
      </div>
    );
  }

  return <img className={logoStyle} alt="logo" src={profile.logo} />;
}
