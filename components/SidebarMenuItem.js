export default function SidebarMenuItem({ text, Icon, active }) {
  return (
    <div className="hoverEffect flex items-center text-gray-700 dark:text-gray-300 justify-center xl:justify-start text-lg space-x-3">
      <Icon className="h-6" />
      <span className={`${active && "font-bold"} hidden xl:inline`}>
        {text}
      </span>
    </div>
  );
}
