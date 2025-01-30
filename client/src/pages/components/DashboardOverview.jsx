import React from "react";
import AccountInfoCard from "./AccountInfoCard";
import QuickStatsCard from "./QuickStatsCard";
import RecentActivityCard from "./RecentActivityCard";
import UpcomingPrintsCard from "./UpcomingPrintsCard";
import PrintQuotaCard from "./PrintQuotaCard";

const DashboardOverview = ({ user }) => (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <AccountInfoCard user={user} />
      <QuickStatsCard />
      <RecentActivityCard />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UpcomingPrintsCard />
      <PrintQuotaCard />
    </div>
  </div>
);

export default DashboardOverview;