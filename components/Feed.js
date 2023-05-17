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
    <div className="max-w-3xl flex-grow  sm:ml-[73px] xl:ml-[250px] xl:min-w-[576px]">
      <div className="sticky top-0 z-40 flex  bg-white/70 px-3 pb-4 pt-8 backdrop-blur-md dark:bg-black/70">
        <h2 className="flex cursor-pointer items-center justify-center text-lg font-bold sm:text-xl">
          Home
        </h2>
        {/* <div className="hoverEffect ml-auto flex h-9 w-9 items-center justify-center px-0">
          <SparklesIcon className="h-5" />
        </div> */}
      </div>
      {/* <Input /> */}
      <AnimatePresence>
        <div className="m-2 grid grid-cols-2 gap-2 md:grid-cols-3">
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
