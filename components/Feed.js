import { SparklesIcon } from "@heroicons/react/24/outline";
import Input from "./Input";
import Post from "./Post";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { AnimatePresence, motion } from "framer-motion";
import Gridpost from "./Gridpost";

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
    <div className="max-w-2xl flex-grow  sm:ml-[73px] lg:mx-auto xl:min-w-[576px]">
      <div className="sticky top-0 z-40 flex  bg-white/70 px-3 py-4 backdrop-blur-md dark:bg-black/70 sm:pb-6 sm:pt-7">
        <h2 className="flex items-center justify-center text-xl font-bold sm:text-3xl">
          Home
        </h2>
        {/* <div className="hoverEffect ml-auto flex h-9 w-9 items-center justify-center px-0">
          <SparklesIcon className="h-5" />
        </div> */}
      </div>
      {/* <Input /> */}
      <AnimatePresence>
        <div className="m-2 grid grid-cols-2 gap-2 sm:gap-5 md:grid-cols-3 md:gap-8">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <Gridpost key={post.id} id={post.id} post={post} />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}
