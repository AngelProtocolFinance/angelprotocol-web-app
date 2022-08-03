import { Link, useNavigate } from "react-router-dom";
import { appRoutes, siteRoutes } from "constants/routes";
import { Button } from "../../common";
import routes from "../../routes";

export default function EndowmentCreated(props: { charityName: string }) {
  const navigate = useNavigate();
  const possessiveFormOfName = getPossessiveForm(props.charityName);

  return (
    <div className="my-5">
      <p>
        Congratulations, you can now start to accept donations to your endowment
        (<TutorialLink />
        ). Click on the button below to view and modify your profile. Welcome to
        the Angel Protocol family!
      </p>
      <Button
        className="bg-thin-blue min-w-fit h-10 px-5 mt-5"
        onClick={() =>
          navigate(
            `${siteRoutes.app}/${appRoutes.register}/${routes.charityProfile}`
          )
        }
      >
        {`Go to ${possessiveFormOfName} profile`}
      </Button>
    </div>
  );
}

// TODO: update this link when the tutorial page gets created
const TutorialLink = () => (
  <Link to={siteRoutes.app} className="hover:underline text-angel-blue">
    click here to learn how
  </Link>
);

function getPossessiveForm(noun: string) {
  if (!noun) return "";
  const doesEndWithS = noun[noun.length - 1].toLowerCase() === "s";
  const suffix = doesEndWithS ? "'" : "'s";
  return noun + suffix;
}
