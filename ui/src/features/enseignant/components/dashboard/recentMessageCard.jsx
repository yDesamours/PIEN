import MessageListItem from "./messageListItem";

const messagesData = [
  {
    name: "Emma Wilson",
    messagePreview: "Question about React hooks assignment...",
    timeAgo: "2 hours ago",
    avatarSrc: "/path/to/emma-avatar.jpg", // Remplacer par le chemin réel
  },
  {
    name: "James Rodriguez",
    messagePreview: "Request for deadline extension...",
    timeAgo: "5 hours ago",
    avatarSrc: "/path/to/james-avatar.jpg", // Remplacer par le chemin réel
  },
  {
    name: "Sarah Johnson",
    messagePreview: "Thank you for the feedback on...",
    timeAgo: "Yesterday",
    avatarSrc: "/path/to/sarah-avatar.jpg", // Remplacer par le chemin réel
  },
];

export default function RecentMessagesCard() {
  return (
    <section className="bg-white p-6 shadow-lg rounded-lg max-w-sm w-full flex-1">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Recent Messages
      </h2>

      <ul className="divide-y divide-gray-200">
        {messagesData.map((message, index) => (
          <MessageListItem
            key={index}
            name={message.name}
            messagePreview={message.messagePreview}
            timeAgo={message.timeAgo}
            avatarSrc={message.avatarSrc}
          />
        ))}
      </ul>

      <div className="mt-5 text-center pt-4 border-t border-gray-100">
        <a
          href="/messages"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium transition duration-150 ease-in-out"
        >
          Voir tous les messages
        </a>
      </div>
    </section>
  );
}
