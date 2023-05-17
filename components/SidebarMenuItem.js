export default function SidebarMenuItem({ text, Icon, active }) {
  return (
    <div className="hoverEffect my-2 flex items-center justify-center space-x-3 text-lg text-black dark:text-white xl:justify-start">
      <Icon className="h-6" />
      {/* <span className={`${active && "font-bold"} hidden xl:inline`}>
        {text}
      </span> */}
    </div>
  );
}
