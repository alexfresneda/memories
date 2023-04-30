import { FaceSmileIcon, PhotoIcon } from "@heroicons/react/24/outline";

export default function Input() {
  return (
    <div className="flex border-b border-gray-200 dark:border-gray-700 p-3 space-x-3">
      <img
        src="/logo.png"
        alt="user image"
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
      />
      <div className="w-full divide-y divide-gray-200 dark:divide-gray-700">
        <div className="">
          <textarea
            className="w-full border-none focus:ring-0 text-lg dark:bg-black tracking-wide min-h-[50px]"
            rows="2"
            placeholder="What's happening?"
          ></textarea>
        </div>
        <div className="flex items-center justify-between pt-2.5">
          <div className="flex">
            <PhotoIcon className="h-10 w-10 hoverEffect p-2 text-blue-400 hover:bg-blue-50" />
            <FaceSmileIcon className="h-10 w-10 hoverEffect p-2 text-blue-400 hover:bg-blue-50" />
          </div>
          <button className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}
