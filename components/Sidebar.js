import Image from "next/image";
import SidebarMenuItem from "./SidebarMenuItem";
import { HomeIcon, UserIcon, PlusIcon } from "@heroicons/react/20/solid";
import {
  BellIcon,
  BookmarkIcon,
  ClipboardIcon,
  HashtagIcon,
  InboxIcon,
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
    <div className="fixed hidden h-full flex-col p-2 sm:flex lg:ml-16 xl:ml-48 xl:items-start">
      {session ? (
        <>
          {/* Mini-Profile */}
          <div className="my-4 cursor-pointer transition duration-500 ease-out hover:scale-105">
            <img
              onClick={signOut}
              src={session.user.image}
              className="h-12 w-12 rounded-full"
              alt="user image"
            />
          </div>
        </>
      ) : (
        <button
          onClick={signIn}
          className="my-4 h-12 w-12 rounded-full bg-black text-lg font-bold text-white shadow-md transition duration-500 ease-out hover:scale-105 dark:bg-white"
        >
          <UserIcon className="inline h-5 text-black" />
        </button>
      )}

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

      {session && (
        <>
          <button
            onClick={() => setOpen(!open)}
            className="h-12 w-12 rounded-full bg-black text-lg font-bold text-white shadow-md transition duration-500 ease-out hover:scale-105 dark:bg-white  "
          >
            <PlusIcon className="inline h-8 text-white dark:text-black" />
          </button>
        </>
      )}
    </div>
  );
}
