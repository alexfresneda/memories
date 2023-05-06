import { SparklesIcon } from "@heroicons/react/24/outline";
import Input from "./Input";
import Post from "./Post";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    []
  );

  return (
    <div className="max-w-xl flex-grow border-l border-r border-gray-200 dark:border-gray-800 sm:ml-[73px] xl:ml-[320px] xl:min-w-[576px]">
      <div className="sticky top-0 z-50 flex border-b border-gray-200 bg-white/70 px-3 py-2 backdrop-blur-md dark:border-gray-800 dark:bg-black/70">
        <h2 className="cursor-pointer text-lg font-bold sm:text-xl">Home</h2>
        <div className="hoverEffect ml-auto flex h-9 w-9 items-center justify-center px-0">
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
