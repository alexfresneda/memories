import { FaceSmileIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { useSession, signOut } from "next-auth/react";

export default function Input() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      {session && (
        <div className="flex space-x-3 border-b border-gray-200 p-3 dark:border-gray-800">
          <img
            onClick={signOut}
            src={session.user.image}
            alt="user image"
            className="h-11 w-11 cursor-pointer rounded-full hover:brightness-95"
          />
          <div className="w-full divide-y divide-gray-200 dark:divide-gray-800">
            <div className="">
              <textarea
                className="min-h-[50px] w-full border-none text-lg tracking-wide focus:ring-0 dark:bg-black"
                rows="2"
                placeholder="What's happening?"
              ></textarea>
            </div>
            <div className="flex items-center justify-between pt-2.5">
              <div className="flex">
                <PhotoIcon className="hoverEffect h-10 w-10 p-2 text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950" />
                <FaceSmileIcon className="hoverEffect h-10 w-10 p-2 text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950" />
              </div>
              <button className="rounded-full bg-blue-400 px-4 py-1.5 font-bold text-white shadow-md hover:brightness-95 disabled:opacity-50">
                Tweet
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
