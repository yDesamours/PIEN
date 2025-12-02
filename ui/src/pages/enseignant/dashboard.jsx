import DashboardSummary from "../../features/enseignant/components/dashboard/dashboardSummary";
import RecentMessagesCard from "../../features/enseignant/components/dashboard/recentMessageCard";
import RecentStudentActivity from "../../features/enseignant/components/dashboard/recentStudentActivity";

export default function Dashboard() {
  return (
    <>
      <section className="py-6 px-4 bg-primary text-white">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p>Bon retour! Voila ou en sont vos activites</p>
      </section>
      <DashboardSummary />
      <div className="flex gap-4 items-start">
        <RecentStudentActivity />
        <RecentMessagesCard />
      </div>
    </>
  );
}
