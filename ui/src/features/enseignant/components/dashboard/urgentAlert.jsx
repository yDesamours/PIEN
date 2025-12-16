import { useState } from "react";

const IconWarning = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const IconClock = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const IconX = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const UrgentAlerts = () => {
  const [alerts, setAlerts] = useState([
    // {
    //   id: 1,
    //   type: "critical",
    //   title: "Maintenance Serveur",
    //   message: "Interruption prévue ce soir à 22h00 pour 30 min.",
    //   time: "Aujourd'hui, 22:00",
    // },
    {
      id: 2,
      type: "warning",
      title: "Clôture des Notes",
      message: "La saisie des notes pour le Trimestre 1 ferme bientôt.",
      time: "Demain, 18:00",
    },
  ]);

  const removeAlert = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  if (alerts.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-3 mt-4">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`relative flex items-start p-4 rounded-lg shadow-sm transition-all duration-300 ${
            alert.type === "critical"
              ? "bg-red-50 border-red-500"
              : "bg-amber-50 border-amber-500"
          }`}
        >
          <div
            className={`shrink-0 mr-3 ${
              alert.type === "critical" ? "text-red-600" : "text-amber-600"
            }`}
          >
            {alert.type === "critical" ? (
              <div className="relative">
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <IconWarning />
              </div>
            ) : (
              <IconClock />
            )}
          </div>

          <div className="flex-1">
            <h4
              className={`text-sm font-bold ${
                alert.type === "critical" ? "text-red-800" : "text-amber-800"
              }`}
            >
              {alert.title}
            </h4>
            <p
              className={`text-sm mt-1 ${
                alert.type === "critical" ? "text-red-700" : "text-amber-700"
              }`}
            >
              {alert.message}
            </p>
            <p
              className={`text-xs mt-2 font-medium flex items-center gap-1 ${
                alert.type === "critical" ? "text-red-600" : "text-amber-600"
              }`}
            >
              <span>⏰ Échéance : {alert.time}</span>
            </p>
          </div>

          <button
            onClick={() => removeAlert(alert.id)}
            className={`p-1 rounded-full hover:bg-opacity-20 transition-colors ${
              alert.type === "critical"
                ? "text-red-400 hover:bg-red-600 hover:text-red-800"
                : "text-amber-400 hover:bg-amber-600 hover:text-amber-800"
            }`}
          >
            <IconX />
          </button>
        </div>
      ))}
    </div>
  );
};

export default UrgentAlerts;
