const UpcomingEvents = () => {
  const events = [
    {
      day: "12",
      month: "DEC",
      title: "Réunion Pédagogique",
      time: "10:00 - Salle 204",
      type: "Meeting",
    },
    {
      day: "14",
      month: "DEC",
      title: "Remise Projet Final",
      time: "23:59 - Moodle",
      type: "Deadline",
    },
    {
      day: "15",
      month: "DEC",
      title: "Cours: Transmission",
      time: "08:30 - Salle 101",
      type: "Class",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex-1">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">
          Prochains Événements
        </h3>
        <button className="text-sm text-blue-600 hover:underline">
          Voir tout
        </button>
      </div>
      <div className="space-y-4">
        {events.map((event, index) => (
          <div
            key={index}
            className="flex gap-4 items-start group cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center bg-blue-50 text-blue-700 rounded-lg w-14 h-14 shrink-0 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <span className="text-xs font-bold uppercase">{event.month}</span>
              <span className="text-lg font-bold leading-none">
                {event.day}
              </span>
            </div>
            <div className="flex-1 pt-1">
              <h4 className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                {event.title}
              </h4>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {event.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
