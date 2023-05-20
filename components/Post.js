import { db, storage } from "@/firebase";
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
import { deleteObject, ref } from "firebase/storage";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import Moment from "react-moment";
import { useRouter } from "next/router";
import "react-quill/dist/quill.snow.css";

export default function Post({ post, id }) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const router = useRouter();

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db]
  );

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes]);

  async function likePost() {
    if (session) {
      if (hasLiked) {
        await deleteDoc(doc(db, "posts", id, "likes", session?.user.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", session?.user.uid), {
          username: session.user.username,
        });
      }
    } else {
      signIn();
    }
  }

  async function deletePost() {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteDoc(doc(db, "posts", id));

      if (post.data().image) {
        deleteObject(ref(storage, `posts/${id}/image`));
      }
      router.push("/");
    }
  }

  return (
    <div className="w-[100%] p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* user image */}
          <img
            className="mr-4 h-8 w-8 rounded-full"
            src={post?.data()?.userImg}
            alt="user-image"
          />
          <h4 className="truncate text-[15px] font-bold hover:underline sm:text-[16px]">
            {post?.data()?.name}
          </h4>
        </div>
        <span className=" text-[15px] font-light text-gray-500 hover:underline dark:text-gray-400 sm:text-[16px]">
          <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
        </span>
      </div>
      <iframe
        className=" sticky top-16 my-4 rounded-xl lg:hidden"
        src={post?.data()?.link}
        width="100%"
        height="80"
        frameBorder="0"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>

      {/* post image image */}
      <img className="my-4 rounded-2xl" src={post?.data()?.image} />
      {/* post text */}
      <div
        className="prose prose-lg dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post?.data()?.text }}
      />

      {/* icons */}
      <div className="mt-8 flex justify-between text-gray-500 dark:text-gray-400">
        <div className="flex items-center">
          {hasLiked ? (
            <HeartIconSolid
              onClick={likePost}
              className="hoverEffect h-12 w-12 p-2 text-red-400 transition duration-200 hover:bg-red-50 dark:hover:bg-red-950"
            />
          ) : (
            <HeartIcon
              onClick={likePost}
              className="hoverEffect h-12 w-12 p-2 transition duration-200 hover:bg-red-50 hover:text-red-400 dark:hover:bg-red-950"
            />
          )}
          {likes.length > 0 && (
            <span className={`${hasLiked && "text-red-600"} text-sm`}>
              {likes.length}
            </span>
          )}
        </div>
        {session?.user.uid === post?.data()?.id && (
          <TrashIcon
            onClick={deletePost}
            className="hoverEffect h-12 w-12 p-2 transition duration-200 hover:bg-red-50 hover:text-red-400 dark:hover:bg-red-950"
          />
        )}
      </div>
    </div>
  );
}
