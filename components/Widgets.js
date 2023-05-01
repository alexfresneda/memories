import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Widgets() {
  return (
    <div className="ml-8 hidden space-y-5 lg:inline xl:w-[600px]">
      <div className="sticky top-0 z-50 w-[90%] bg-white py-1.5 dark:bg-black xl:w-[75%]">
        <div className="relative flex items-center rounded-full p-3">
          <MagnifyingGlassIcon className="z-50 h-5 text-gray-500" />
          <input
            className=" absolute inset-0 rounded-full border-none bg-gray-100 pl-11 text-gray-700 focus:shadow-lg dark:bg-gray-900"
            type="text"
            placeholder="Search Twitter"
          />
        </div>
      </div>
    </div>
  );
}
