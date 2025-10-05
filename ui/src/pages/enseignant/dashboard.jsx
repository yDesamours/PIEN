import DashboardSummary from "../../features/enseignant/components/dashboard/dashboardSummary";

export default function Dashboard() {
  return (
    <>
      <section className="py-6 px-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p>Bon retour! Voila ou en sont vos activites</p>
        <DashboardSummary />
      </section>
    </>
  );
}
