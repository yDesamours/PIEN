import StatCard from "./statCard";

const DashboardSummary = () => {
  return (
    <div className="flex justify-left items-center gap-5 p-5">
      <StatCard
        title="Classes Actives"
        value="5"
        description={
          <span className="text-green-500 font-bold">↑ +1 this semester</span>
        }
        icon="📖"
        iconBgClass="bg-blue-100 text-blue-600"
      />

      <StatCard
        title="Total Eleves"
        value="247"
        description={<span className="text-blue-600">Across all courses</span>}
        icon="👥"
        iconBgClass="bg-green-100 text-green-600"
      />

      <StatCard
        title="Correction en Attente"
        value="18"
        description={<span className="text-red-500">⚠️ Need attention</span>}
        icon="📝"
        iconBgClass="bg-orange-100 text-orange-600"
      />
    </div>
  );
};

export default DashboardSummary;
