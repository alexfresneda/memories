import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import News from "./News";
import { useState } from "react";

export default function Widgets({ newsResults, randomUsersResults }) {
  const [articleNum, setArticleNum] = useState(3);
  const [randomUserNum, setRandomUserNum] = useState(3);
  return (
    <div className="ml-8 hidden space-y-5 lg:inline xl:w-[600px]">
      <div className="sticky top-0 z-50 w-[90%] max-w-[400px] bg-white py-1.5 dark:bg-black ">
        <div className="relative flex items-center rounded-full p-3">
          <MagnifyingGlassIcon className="z-50 h-5 text-gray-500" />
          <input
            className=" absolute inset-0 rounded-full border-none bg-gray-100 pl-11 text-gray-700 focus:shadow-lg dark:bg-gray-900"
            type="text"
            placeholder="Search Twitter"
          />
        </div>
      </div>

      <div className="w-[90%] max-w-[400px] space-y-3 rounded-xl bg-gray-100 pt-2 text-gray-700 dark:bg-gray-900 dark:text-gray-300">
        <h4 className="px-4 text-xl font-bold">What's happening</h4>
        {newsResults.slice(0, articleNum).map((article) => (
          <News key={article.title} article={article} />
        ))}
        <button
          onClick={() => setArticleNum(articleNum + 3)}
          className="pb-3 pl-4 text-blue-400 hover:text-blue-500"
        >
          Show more
        </button>
      </div>
      <div className="sticky top-16 w-[90%] max-w-[400px] space-y-3 rounded-xl bg-gray-100 pt-2 text-gray-700 dark:bg-gray-900 dark:text-gray-300">
        <h4 className="px-4 text-xl font-bold">Who to follow</h4>
        {randomUsersResults.slice(0, randomUserNum).map((randomUser) => (
          <div
            key={randomUser.login.username}
            className="flex cursor-pointer items-center px-4 py-2 transition duration-200 hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <img
              className="rounded-full"
              width="40"
              src={randomUser.picture.thumbnail}
            />
            <div className="ml-4 mr-4 truncate leading-5">
              <h4 className="truncate font-bold hover:underline">
                {randomUser.login.username}
              </h4>
              <h5 className="truncate text-[14px] text-gray-500 dark:text-gray-400">
                {randomUser.name.first + " " + randomUser.name.last}
              </h5>
            </div>
            <button className="ml-auto rounded-full bg-black px-3.5 py-1.5 text-sm font-bold text-white dark:bg-white dark:text-black">
              Follow
            </button>
          </div>
        ))}
        <button
          onClick={() => setRandomUserNum(randomUserNum + 3)}
          className="pb-3 pl-4 text-blue-400 hover:text-blue-500"
        >
          Show more
        </button>
      </div>
    </div>
  );
}
