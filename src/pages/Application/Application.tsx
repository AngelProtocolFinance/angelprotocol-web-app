import { applications } from "services/aws/constants";
import Container from "./Container";

const app = applications[0];
export default function Application() {
  return (
    <div className="grid grid-cols-[1fr_auto] content-start gap-y-4 lg:gap-y-8 lg:gap-x-3 relative padded-container pt-8 lg:pt-20 pb-8">
      <h1 className="text-center text-3xl max-lg:font-work col-span-full max-lg:mb-4">
        Applications Review - Details
      </h1>
      <h3 className="text-lg">{app.OrganizationName}</h3>
      <p>Application ID: {app.PK}</p>
      <Container title="Endowment application">content</Container>
      <Container title="Banking details">content</Container>
    </div>
  );
}
