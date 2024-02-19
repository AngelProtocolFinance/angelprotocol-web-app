import withAuth from "contexts/Auth";
import { usePaginatedDonationRecords } from "services/apes";
import DonationsSection from "./DonationsSection";

export default withAuth(function Donations({ user }) {
  const completeDonations = usePaginatedDonationRecords({ email: user.email });

  return <DonationsSection {...completeDonations} />;
});
