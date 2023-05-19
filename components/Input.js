import { modalState } from "@/atom/modalAtom";
import { db, storage } from "@/firebase";
import { ViewfinderCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
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
import { useMemo, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.bubble.css";

export default function Input() {
  const [open, setOpen] = useRecoilState(modalState);
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef(null);

  //react-quill
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const [value, setValue] = useState("");

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      // text: input,
      text: value,
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

    // setInput("");
    setValue("");
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
        <div className="flex w-full grow flex-col space-x-3">
          {/* react quill goes here */}
          <ReactQuill
            className="prose prose-lg grow border-none dark:prose-invert prose-h1:leading-loose prose-h2:leading-loose prose-p:text-lg prose-ol:text-lg prose-ul:text-lg prose-li:text-lg"
            theme="bubble"
            value={value}
            onChange={setValue}
          />

          {/* <div className="order-0 flex-none grow">
            <textarea
              className=" min-h-[50px] w-full border-none bg-stone-200 p-1 text-lg tracking-wide focus:ring-0 dark:bg-stone-900"
              // rows="2"
              placeholder="What's happening?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
          </div> */}
          {selectedFile && (
            <div className="relative mb-4 flex-none border-none">
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
          <div className="flex flex-none items-center justify-end border-none pt-2.5">
            {!loading && (
              <>
                <div className="flex">
                  <div
                    className=""
                    onClick={() => filePickerRef.current.click()}
                  >
                    <ViewfinderCircleIcon className="hoverEffect h-12 w-12 p-2 text-stone-700 hover:bg-stone-300 dark:text-stone-300 dark:hover:bg-stone-800" />
                    <input
                      type="file"
                      hidden
                      ref={filePickerRef}
                      onChange={addImageToPost}
                    />
                  </div>

                  {/* <FaceSmileIcon className="hoverEffect h-10 w-10 p-2 text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950" /> */}
                </div>
                <button
                  onClick={sendPost}
                  disabled={!value.trim()}
                  className="ml-4 rounded-full bg-black px-6 py-2 text-xl font-bold text-white shadow-md transition duration-500 ease-out hover:scale-105 disabled:hidden dark:bg-white dark:text-black"
                >
                  Save
                </button>
              </>
            )}
          </div>
          {/* </div> */}
        </div>
      )}
    </>
  );
}
