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
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useRouter } from "next/router";

export default function Gridpost({ post, id }) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const router = useRouter();

  return (
    <div onClick={() => router.push(`/posts/${id}`)} className="p-1">
      {/* post image image */}
      <img
        className="h-60 w-60 cursor-pointer rounded-3xl border border-gray-200 object-cover transition duration-500 ease-out hover:scale-105 dark:border-gray-800"
        src={post?.data()?.image}
      />
    </div>
  );

  // useEffect(
  //   () =>
  //     onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
  //       setLikes(snapshot.docs)
  //     ),
  //   [db]
  // );

  // useEffect(() => {
  //   setHasLiked(
  //     likes.findIndex((like) => like.id === session?.user.uid) !== -1
  //   );
  // }, [likes]);

  // async function likePost() {
  //   if (session) {
  //     if (hasLiked) {
  //       await deleteDoc(doc(db, "posts", id, "likes", session?.user.uid));
  //     } else {
  //       await setDoc(doc(db, "posts", id, "likes", session?.user.uid), {
  //         username: session.user.username,
  //       });
  //     }
  //   } else {
  //     signIn();
  //   }
  // }

  // async function deletePost() {
  //   if (window.confirm("Are you sure you want to delete this post?")) {
  //     deleteDoc(doc(db, "posts", id));

  //     if (post.data().image) {
  //       deleteObject(ref(storage, `posts/${id}/image`));
  //     }
  //     router.push("/");
  //   }
  // }
}
