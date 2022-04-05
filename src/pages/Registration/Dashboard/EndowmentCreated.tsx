import { app, site } from "constants/routes";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../common";
import routes from "../routes";

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
          navigate(`${site.app}/${app.register}/${routes.charityProfile}`)
        }
      >
        {`Go to ${possessiveFormOfName} profile`}
      </Button>
    </div>
  );
}

// TODO: update this link when the tutorial page gets created
const TutorialLink = () => (
  <Link to={site.home} className="hover:underline text-angel-blue">
    click here to learn how
  </Link>
);

function getPossessiveForm(noun: string) {
  if (!noun) return "";
  const doesEndWithS = noun[noun.length - 1].toLowerCase() === "s";
  const suffix = doesEndWithS ? "'" : "'s";
  return noun + suffix;
}
