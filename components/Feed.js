import { SparklesIcon } from "@heroicons/react/24/outline";
import Input from "./Input";
import Post from "./Post";

export default function Feed() {
  const posts = [
    {
      id: "1",
      name: "Alex Fresneda",
      username: "alex",
      userImg: "/logo.png",
      img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      text: "nice view!",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      name: "Alex Fresneda",
      username: "alex",
      userImg: "/logo.png",
      img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      text: "wow",
      timestamp: "3 days ago",
    },
  ];
  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200 dark:border-gray-800 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <Input />
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
