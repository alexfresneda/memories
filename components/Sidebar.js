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
  ArrowRightOnRectangleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRecoilState } from "recoil";
import { modalState } from "@/atom/modalAtom";

export default function Sidebar() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);

  return (
    <div className="fixed hidden h-full flex-col p-2 sm:flex xl:ml-40 xl:items-start">
      {/* Logo */}
      {/* <div
        className="hoverEffect p-0
      "
      >
        <Image width="50" height="50" src="/logo.png"></Image>
      </div> */}
      {/* Menu */}
      <div className="my-2 xl:items-start">
        <SidebarMenuItem text="Home" Icon={HomeIcon} active />
        <SidebarMenuItem text="Explore" Icon={MagnifyingGlassIcon} />

        {/* {session && (
          <>
            <SidebarMenuItem text="Notifications" Icon={BellIcon} />
            <SidebarMenuItem text="Messages" Icon={InboxIcon} />
            <SidebarMenuItem text="Bookmark" Icon={BookmarkIcon} />
            <SidebarMenuItem text="Lists" Icon={ClipboardIcon} />
            <SidebarMenuItem text="Profile" Icon={UserIcon} />
            <SidebarMenuItem text="More" Icon={EllipsisHorizontalCircleIcon} />
          </>
        )} */}
      </div>
      {/* Button */}

      {session ? (
        <>
          <button
            onClick={() => setOpen(!open)}
            className="h-12 w-12 rounded-full bg-black text-lg font-bold text-white shadow-md transition duration-500 ease-out hover:scale-105 dark:bg-white  "
          >
            {/* <p className="hidden xl:inline">Tweet</p> */}
            <PlusIcon className="inline h-8 text-white dark:text-black" />
          </button>

          {/* Mini-Profile */}
          <div className="mb-4 mt-auto cursor-pointer transition duration-500 ease-out hover:scale-105">
            <img
              onClick={signOut}
              src={session.user.image}
              className="h-12 w-12 rounded-full"
              alt="user image"
            />
            {/* <div className="hidden truncate leading-5 xl:inline">
              <h4 className="truncate text-sm font-bold">
                {session.user.name}
              </h4>
              <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                @{session.user.username}
              </p>
            </div>
            <EllipsisHorizontalIcon
              onClick={signOut}
              className="hidden w-[32px] xl:ml-8 xl:inline"
            /> */}
          </div>
        </>
      ) : (
        <button
          onClick={signIn}
          className="h-12 w-12 rounded-full bg-blue-400 text-lg font-bold text-white shadow-md hover:brightness-95 xl:w-56"
        >
          <p className="hidden xl:inline">Sign in</p>
          <ArrowRightOnRectangleIcon className="inline h-5 xl:hidden" />
        </button>
      )}
    </div>
  );
}
