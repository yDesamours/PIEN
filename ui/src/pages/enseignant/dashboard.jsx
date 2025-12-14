import DashboardSummary from "../../features/enseignant/components/dashboard/dashboardSummary";
import QuickActions from "../../features/enseignant/components/dashboard/quickAction";
import RecentMessagesCard from "../../features/enseignant/components/dashboard/recentMessageCard";
import RecentStudentActivity from "../../features/enseignant/components/dashboard/recentStudentActivity";
import StudentsAtRisk from "../../features/enseignant/components/dashboard/riskStudent";
import UpcomingEvents from "../../features/enseignant/components/dashboard/upcomingEvent";
import UrgentAlerts from "../../features/enseignant/components/dashboard/urgentAlert";

export default function Dashboard() {
  return (
    <>
      <section className="py-6 px-4 bg-primary text-white">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p>Bon retour! Voila ou en sont vos activites</p>
      </section>

      <UrgentAlerts />
      <DashboardSummary />
      <QuickActions />

      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-start">
          <RecentStudentActivity />
          <RecentMessagesCard />
        </div>
        <div className="flex gap-4 items-start ">
          <StudentsAtRisk />
          <UpcomingEvents />
        </div>
      </div>
    </>
  );
}
