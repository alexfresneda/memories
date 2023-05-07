import { db } from "@/firebase";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/20/solid";
import {
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Moment from "react-moment";

export default function Post({ post }) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", post.id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes]);

  async function likePost() {
    if (session) {
      if (hasLiked) {
        await deleteDoc(doc(db, "posts", post.id, "likes", session?.user.uid));
      } else {
        await setDoc(doc(db, "posts", post.id, "likes", session?.user.uid), {
          username: session.user.username,
        });
      }
    } else {
      signIn();
    }
  }

  return (
    <div className="flex cursor-pointer border-b border-gray-200 p-3 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-950">
      {/* user image */}
      <img
        className="mr-4 h-11 w-11 rounded-full"
        src={post.data().userImg}
        alt="user-image"
      />
      {/* right side */}
      <div className="">
        {/* header */}
        <div className="flex items-center justify-between">
          {/* post user info */}
          <div className="flex space-x-1 ">
            <h4 className="truncate text-[15px] font-bold hover:underline sm:text-[16px]">
              {post.data().name}
            </h4>
            <span className="text-[15px] font-light text-gray-500 dark:text-gray-400 sm:text-[16px]">
              @{post.data().username} ·
            </span>
            <span className="text-[15px] font-light text-gray-500 hover:underline dark:text-gray-400 sm:text-[16px]">
              <Moment fromNow>{post?.data().timestamp?.toDate()}</Moment>
            </span>
          </div>
          {/* dot icon */}
          <EllipsisHorizontalIcon className="hoverEffect h-10 w-10 p-2 transition duration-200 hover:bg-blue-50 hover:text-blue-400 dark:hover:bg-blue-950" />
        </div>
        {/* post text */}
        <p className="mb-2 text-[15px] text-gray-800 dark:text-gray-200 sm:text-[16px]">
          {post.data().text}
        </p>
        {/* post image image */}
        <img className="mr-2 rounded-2xl" src={post.data().image} />
        {/* icons */}
        <div className="flex justify-between p-2 text-gray-500 dark:text-gray-400">
          <ChatBubbleOvalLeftEllipsisIcon className="hoverEffect h-9 w-9 p-2 transition duration-200 hover:bg-blue-50 hover:text-blue-400 dark:hover:bg-blue-950" />
          {session?.user.uid === post?.data().id && (
            <TrashIcon className="hoverEffect h-9 w-9 p-2 transition duration-200 hover:bg-red-50 hover:text-red-400 dark:hover:bg-red-950" />
          )}
          <div className="flex items-center">
            {hasLiked ? (
              <HeartIconSolid
                onClick={likePost}
                className="hoverEffect h-9 w-9 p-2 text-red-400 transition duration-200 hover:bg-red-50 dark:hover:bg-red-950"
              />
            ) : (
              <HeartIcon
                onClick={likePost}
                className="hoverEffect h-9 w-9 p-2 transition duration-200 hover:bg-red-50 hover:text-red-400 dark:hover:bg-red-950"
              />
            )}
            {likes.length > 0 && (
              <span className={`${hasLiked && "text-red-600"} text-sm`}>
                {likes.length}
              </span>
            )}
          </div>

          <ShareIcon className="hoverEffect h-9 w-9 p-2 transition duration-200 hover:bg-blue-50 hover:text-blue-400 dark:hover:bg-blue-950" />
          <ChartBarIcon className="hoverEffect h-9 w-9 p-2 transition duration-200 hover:bg-blue-50 hover:text-blue-400 dark:hover:bg-blue-950" />
        </div>
      </div>
    </div>
  );
}
