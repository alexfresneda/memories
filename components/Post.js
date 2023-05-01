import { ChatBubbleLeftIcon } from "@heroicons/react/20/solid";
import {
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export default function Post({ post }) {
  return (
    <div className="flex cursor-pointer border-b border-gray-200 p-3 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-950">
      {/* user image */}
      <img
        className="mr-4 h-11 w-11 rounded-full"
        src={post.userImg}
        alt="user-image"
      />
      {/* right side */}
      <div className="">
        {/* header */}
        <div className="flex items-center justify-between">
          {/* post user info */}
          <div className="flex space-x-1 ">
            <h4 className="truncate text-[15px] font-bold hover:underline sm:text-[16px]">
              {post.name}
            </h4>
            <span className="text-[15px] font-light text-gray-500 dark:text-gray-400 sm:text-[16px]">
              @{post.username} ·
            </span>
            <span className="text-[15px] font-light text-gray-500 hover:underline dark:text-gray-400 sm:text-[16px]">
              {post.timestamp}
            </span>
          </div>
          {/* dot icon */}
          <EllipsisHorizontalIcon className="hoverEffect h-10 w-10 p-2 transition duration-200 hover:bg-blue-50 hover:text-blue-400 dark:hover:bg-blue-950" />
        </div>
        {/* post text */}
        <p className="mb-2 text-[15px] text-gray-800 dark:text-gray-200 sm:text-[16px]">
          {post.text}
        </p>
        {/* post image image */}
        <img className="mr-2 rounded-2xl" src={post.img} />
        {/* icons */}
        <div className="flex justify-between p-2 text-gray-500 dark:text-gray-400">
          <ChatBubbleOvalLeftEllipsisIcon className="hoverEffect h-9 w-9 p-2 transition duration-200 hover:bg-blue-50 hover:text-blue-400 dark:hover:bg-blue-950" />
          <TrashIcon className="hoverEffect h-9 w-9 p-2 transition duration-200 hover:bg-red-50 hover:text-red-400 dark:hover:bg-red-950" />
          <HeartIcon className="hoverEffect h-9 w-9 p-2 transition duration-200 hover:bg-red-50 hover:text-red-400 dark:hover:bg-red-950" />
          <ShareIcon className="hoverEffect h-9 w-9 p-2 transition duration-200 hover:bg-blue-50 hover:text-blue-400 dark:hover:bg-blue-950" />
          <ChartBarIcon className="hoverEffect h-9 w-9 p-2 transition duration-200 hover:bg-blue-50 hover:text-blue-400 dark:hover:bg-blue-950" />
        </div>
      </div>
    </div>
  );
}
