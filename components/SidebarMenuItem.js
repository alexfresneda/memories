export default function SidebarMenuItem({ text, Icon, active }) {
  return (
    <div className="hoverEffect flex items-center justify-center space-x-3 text-lg text-gray-700 dark:text-gray-300 xl:justify-start">
      <Icon className="h-6" />
      {/* <span className={`${active && "font-bold"} hidden xl:inline`}>
        {text}
      </span> */}
    </div>
  );
}
