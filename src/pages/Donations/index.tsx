import withAuth from "contexts/Auth";
import { usePaginatedDonationRecords } from "services/apes";
import DonationsSection from "./DonationsSection";

export default withAuth(function Donations({ user }) {
  const onHoldDonations = usePaginatedDonationRecords({ email: user.email });
  const completeDonations = usePaginatedDonationRecords({ email: user.email });

  return (
    <div className="grid gap-40 py-8 lg:pt-20">
      <DonationsSection {...onHoldDonations} title="Pending Donations" />
      <DonationsSection {...completeDonations} title="Finalized Donations" />
    </div>
  );
});
