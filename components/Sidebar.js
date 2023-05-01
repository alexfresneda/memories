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
    <div className="fixed hidden h-full flex-col p-2 sm:flex xl:ml-12 xl:items-start">
      {/* Logo */}
      <div
        className="hoverEffect p-0
      "
      >
        <Image width="50" height="50" src="/logo.png"></Image>
      </div>
      {/* Menu */}
      <div className="mb-2.5 mt-4 xl:items-start">
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
      <button className="h-12 w-12 rounded-full bg-blue-400 text-lg font-bold text-white shadow-md hover:brightness-95 xl:w-56 ">
        <p className="hidden xl:inline">Tweet</p>
        <PlusIcon className="inline h-5 xl:hidden" />
      </button>
      {/* Mini-Profile */}
      <div className="hoverEffect mt-auto flex items-center justify-center text-gray-700 dark:text-gray-300 xl:justify-start">
        <img
          src="/logo.png"
          className="h-10 w-10 rounded-full xl:mr-2"
          alt="user image"
        />
        <div className="hidden leading-5 xl:inline">
          <h4 className="font-bold">Alex Fresneda</h4>
          <p className="text-gray-500 dark:text-gray-400">@alex</p>
        </div>
        <EllipsisHorizontalIcon className="hidden h-5 xl:ml-8 xl:inline" />
      </div>
    </div>
  );
}
