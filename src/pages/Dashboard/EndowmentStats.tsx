import Figure from "pages/Governance/Figure";

type EndowmentStats = { 
    latestTVL: number;
    totalUSTDonated: number;
    totalUSTWithdrawn: number;
    totalNumDonations: number;
};

export default function EndowmentStats ({ 
    latestTVL, 
    totalUSTDonated, 
    totalUSTWithdrawn, 
    totalNumDonations 
}: EndowmentStats) {
    return (
        <>
            <h2 className="font-heading uppercase font-bold text-4xl mt-4 text-white-grey">
              Endowments
            </h2>
            <div className="flex flex-wrap lg:grid lg:grid-cols-2 xl:grid-cols-4 gap-3 mb-5">
              <Figure title="Total UST Donated" denom="UST" value={totalUSTDonated} />
              <Figure title="Total Value Locked" denom="UST" value={latestTVL} />
              <Figure
                title="Total UST Withdrawn"
                denom="UST"
                value={totalUSTWithdrawn}
              />
              <Figure
                title="Number of Donations"
                denom=""
                value={totalNumDonations}
              />
            </div>
        </>
    )
}