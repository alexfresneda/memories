import Image from "next/image";
import SidebarMenuItem from "./SidebarMenuItem";
import { HomeIcon, PlusIcon } from "@heroicons/react/20/solid";
import {
  BellIcon,
  BookmarkIcon,
  ClipboardIcon,
  HashtagIcon,
  InboxIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full">
      {/* Logo */}
      <div
        className="hoverEffect p-0
      "
      >
        <Image width="50" height="50" src="/logo.png"></Image>
      </div>
      {/* Menu */}
      <div className="mt-4 mb-2.5 xl:items-start">
        <SidebarMenuItem text="Home" Icon={HomeIcon} active />
        <SidebarMenuItem text="Explore" Icon={HashtagIcon} />
        <SidebarMenuItem text="Notifications" Icon={BellIcon} />
        <SidebarMenuItem text="Messages" Icon={InboxIcon} />
        <SidebarMenuItem text="Bookmark" Icon={BookmarkIcon} />
        <SidebarMenuItem text="Lists" Icon={ClipboardIcon} />
        <SidebarMenuItem text="Profile" Icon={UserIcon} />
        <SidebarMenuItem text="More" Icon={EllipsisHorizontalCircleIcon} />
      </div>
      {/* Button */}
      <button className="bg-blue-400 text-white rounded-full w-12 xl:w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg ">
        <p className="hidden xl:inline">Tweet</p>
        <PlusIcon className="h-5 inline xl:hidden" />
      </button>
      {/* Mini-Profile */}
      <div className="hoverEffect text-gray-700 dark:text-gray-300 flex items-center justify-center xl:justify-start mt-auto">
        <img
          src="/logo.png"
          className="h-10 w-10 rounded-full xl:mr-2"
          alt="user image"
        />
        <div className="leading-5 hidden xl:inline">
          <h4 className="font-bold">Alex Fresneda</h4>
          <p className="text-gray-500 dark:text-gray-400">@alex</p>
        </div>
        <EllipsisHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
      </div>
    </div>
  );
}
