import { modalState } from "@/atom/modalAtom";
import { db, storage } from "@/firebase";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { FaceSmileIcon, PhotoIcon } from "@heroicons/react/24/outline";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useSession, signOut } from "next-auth/react";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";

export default function Input() {
  const [open, setOpen] = useRecoilState(modalState);
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef(null);

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      text: input,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
      name: session.user.name,
      username: session.user.username,
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setInput("");
    setSelectedFile(null);
    setLoading(false);
    setOpen(false);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <>
      {session && (
        <div className="flex h-[80%] space-x-3">
          {/* <img
            // onClick={signOut}
            src={session.user.image}
            alt="user image"
            className="h-11 w-11 cursor-pointer rounded-full hover:brightness-95"
          /> */}
          <div className="h-full w-full divide-y divide-gray-200 dark:divide-gray-800">
            <div className="h-full">
              <textarea
                className="h-full min-h-[50px] w-full border-none p-1 text-lg tracking-wide focus:ring-0 dark:bg-black"
                // rows="2"
                placeholder="What's happening?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
            </div>
            {selectedFile && (
              <div className="relative mb-4 border-none">
                <XCircleIcon
                  onClick={() => setSelectedFile(null)}
                  className={`${
                    loading
                      ? "hidden"
                      : "absolute m-1 h-8 cursor-pointer text-black opacity-50 transition duration-200 hover:opacity-60"
                  }`}
                />
                <img
                  className={`${
                    loading
                      ? "h-32 w-48 animate-pulse rounded-xl border border-gray-200 object-cover dark:border-gray-800"
                      : "h-32 w-48 rounded-xl border border-gray-200 object-cover dark:border-gray-800"
                  }`}
                  src={selectedFile}
                />
              </div>
            )}
            <div className="flex items-center justify-between pt-2.5">
              {!loading && (
                <>
                  <div className="flex">
                    <div
                      className=""
                      onClick={() => filePickerRef.current.click()}
                    >
                      <PhotoIcon className="hoverEffect h-10 w-10 p-2 text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950" />
                      <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      />
                    </div>

                    <FaceSmileIcon className="hoverEffect h-10 w-10 p-2 text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950" />
                  </div>
                  <button
                    onClick={sendPost}
                    disabled={!input.trim()}
                    className="rounded-full bg-blue-400 px-4 py-1.5 font-bold text-white shadow-md hover:brightness-95 disabled:opacity-50"
                  >
                    Tweet
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
