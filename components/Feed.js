import { SparklesIcon, UserIcon } from "@heroicons/react/24/outline";
import Input from "./Input";
import Post from "./Post";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { AnimatePresence, motion } from "framer-motion";
import Gridpost from "./Gridpost";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
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
    <div className="max-w-2xl flex-grow  md:ml-[73px] lg:ml-[180px] xl:ml-[300px] xl:min-w-[576px]">
      <div className="sticky top-0 z-40 flex  bg-white/70 px-3 py-3 backdrop-blur-md dark:bg-black/70 sm:pb-6 sm:pt-7">
        <h2 className="flex items-center justify-center text-xl font-bold sm:text-3xl">
          Home
        </h2>
        <div className="ml-auto flex h-8 w-8 items-center justify-center px-0">
          {session ? (
            <>
              {/* Mini-Profile */}
              <div className=" cursor-pointer transition duration-500 ease-out hover:scale-105 md:hidden">
                <img
                  onClick={signOut}
                  src={session.user.image}
                  className=" rounded-full"
                  alt="user image"
                />
              </div>
            </>
          ) : (
            <button
              onClick={signIn}
              className=" flex h-8 w-8 items-center justify-center rounded-full bg-black text-lg font-bold text-white shadow-md transition duration-500 ease-out hover:scale-105 dark:bg-white dark:text-black md:hidden"
            >
              <UserIcon className="h-5" />
            </button>
          )}
        </div>
      </div>
      {/* <Input /> */}
      {session ? (
        <AnimatePresence>
          <div className="m-2 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-5 md:gap-8">
            {posts
              .filter((posts) => posts.data().id === session.user.uid)
              .map((post) => (
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
      ) : (
        <div className="m-2 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-5 md:gap-8">
          <div className="h-48 w-48 rounded-5xl bg-stone-200 dark:bg-stone-800" />
          <div className="h-48 w-48 rounded-5xl bg-stone-200 dark:bg-stone-800" />
          <div className="hidden h-48 w-48 rounded-5xl bg-stone-200 dark:bg-stone-800 sm:inline" />

          <div className="h-48 w-48 rounded-5xl bg-stone-100 dark:bg-stone-900" />
          <div className="flex h-48 w-48 items-center justify-center rounded-5xl bg-stone-100 dark:bg-stone-900">
            <button
              onClick={signIn}
              className="hidden rounded-full bg-black px-5 py-2 text-white hover:bg-opacity-90 dark:bg-white dark:text-black sm:inline
            "
            >
              Sign in
            </button>
          </div>
          <div className="hidden h-48 w-48 rounded-5xl bg-stone-100 dark:bg-stone-900 sm:inline" />

          <div className="h-48 w-48 rounded-5xl bg-stone-50 dark:bg-stone-950" />
          <div className="h-48 w-48 rounded-5xl bg-stone-50 dark:bg-stone-950" />
          <div className="hidden h-48 w-48 rounded-5xl bg-stone-50 dark:bg-stone-950 sm:inline" />
        </div>
      )}
    </div>
  );
}
