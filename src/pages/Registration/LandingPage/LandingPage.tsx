import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { removeSavedRegistrationReference } from "helpers";
import { Button, ButtonMailTo } from "../common";
import routes from "../routes";
import ResumeForm from "./ResumeForm";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleStart = () => {
    removeSavedRegistrationReference();
    navigate(routes.contactDetails);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full h-full items-center justify-center">
      <Section>
        <Heading>
          Thank you for registering, we'd love to have you on board!
        </Heading>

        <StepsDescription />

        <Button onClick={handleStart} className="bg-orange w-40 h-10">
          Start
        </Button>
      </Section>

      <Section>
        <Heading>Do you wish to continue your registration?</Heading>
        <span className="text-base mb-5">
          Enter your registration reference below and resume where you left off.
        </span>

        <ResumeForm />

        <ButtonMailTo
          label="Having trouble resuming your registration?"
          mailTo="support@angelprotocol.io"
          subject="Charity Registration: Trouble with confirmation email"
        />
      </Section>
    </div>
  );
}

function Section({ children }: PropsWithChildren<{}>) {
  return (
    <div className="flex flex-col gap-3 items-center justify-center h-full w-full max-h-96 p-4 ring-1 ring-angel-blue rounded-md bg-angel-blue/20">
      {children}
    </div>
  );
}

function Heading({ children }: PropsWithChildren<{}>) {
  return <span className="text-xl font-bold">{children}</span>;
}

function StepsDescription() {
  return (
    <div className="text-base mb-5 flex flex-col items-center gap-3">
      <span>You just need to provide the following data:</span>
      <ol className="list-decimal list-outside flex flex-col items-start pl-10 italic">
        <li>Contact Details</li>
        <li>Documentation</li>
        <li>Additional Information</li>
        <li>Wallet address</li>
        <li>Verify your email</li>
      </ol>
    </div>
  );
}
