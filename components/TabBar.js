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
  HeartIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRecoilState } from "recoil";
import { modalState } from "@/atom/modalAtom";

export default function TabBar() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);

  return (
    <div className="fixed bottom-2 flex  w-full md:hidden">
      {session && (
        <>
          <button
            onClick={() => setOpen(!open)}
            className="mx-auto h-16 w-16 rounded-full bg-black text-lg font-bold text-white shadow-md transition duration-500 ease-out hover:scale-105 dark:bg-white  "
          >
            <PlusIcon className="inline h-12 text-white dark:text-black" />
          </button>
        </>
      )}
    </div>
  );
}
