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
    <div className="flex p-3 cursor-pointer border-b border-gray-200 dark:border-gray-800">
      {/* user image */}
      <img
        className="h-11 w-11 rounded-full mr-4"
        src={post.userImg}
        alt="user-image"
      />
      {/* right side */}
      <div className="">
        {/* header */}
        <div className="flex items-center justify-between">
          {/* post user info */}
          <div className="flex space-x-1 ">
            <h4 className="truncate font-bold text-[15px] sm:text-[16px] hover:underline">
              {post.name}
            </h4>
            <span className="font-light text-gray-500 dark:text-gray-400 text-[15px] sm:text-[16px]">
              @{post.username} ·
            </span>
            <span className="font-light text-gray-500 dark:text-gray-400 text-[15px] sm:text-[16px] hover:underline">
              {post.timestamp}
            </span>
          </div>
          {/* dot icon */}
          <EllipsisHorizontalIcon className="h-10 w-10 hoverEffect hover:bg-blue-50 hover:text-blue-400 dark:hover:bg-blue-950 p-2" />
        </div>
        {/* post text */}
        <p className="text-gray-800 dark:text-gray-200 text-[15px] sm:text-[16px] mb-2">
          {post.text}
        </p>
        {/* post image image */}
        <img className="rounded-2xl mr-2" src={post.img} />
        {/* icons */}
        <div className="flex justify-between text-gray-500 dark:text-gray-400 p-2">
          <ChatBubbleOvalLeftEllipsisIcon className="h-9 w-9 hoverEffect p-2 hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950" />
          <TrashIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950" />
          <HeartIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950" />
          <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950" />
          <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950" />
        </div>
      </div>
    </div>
  );
}
