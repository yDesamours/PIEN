export default function TabPaneNav({ className, children }) {
  return (
    <ul role="navigation" className={className}>
      {children}
    </ul>
  );
}
