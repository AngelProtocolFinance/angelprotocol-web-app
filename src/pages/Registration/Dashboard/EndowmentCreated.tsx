import { site } from "constants/routes";
import { Link, useHistory } from "react-router-dom";
import Button from "../Button";
import routes from "../routes";

export default function EndowmentCreated(props: { charityName: string }) {
  const history = useHistory();
  const possessiveFormOfName = getPossessiveForm(props.charityName);

  // TODO: update this link when the tutorial page gets created
  const tutorialLink = (
    <Link to={site.home} className="hover:underline text-angel-blue">
      click here to learn how
    </Link>
  );

  return (
    <div className="my-5">
      <p>
        Congratulations, you can now start to accept donations to your endowment
        ({tutorialLink}). Click on the button below to view and modify your
        profile. Welcome to the Angel Protocol family!
      </p>
      <Button
        className="bg-thin-blue min-w-fit h-10 px-5 mt-5"
        onClick={() => history.push(routes.charityProfile)}
        title="Available soon"
      >
        {`Go to ${possessiveFormOfName} profile`}
      </Button>
    </div>
  );
}

function getPossessiveForm(noun: string) {
  if (!noun) return "";
  const doesEndWithS = noun[noun.length - 1].toLowerCase() === "s";
  const suffix = doesEndWithS ? "'" : "'s";
  return noun + suffix;
}
