import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";
import Modal from "react-modal";
import { XCircleIcon } from "@heroicons/react/20/solid";
import Input from "./Input";

export default function InputModal() {
  const [open, setOpen] = useRecoilState(modalState);
  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          className="fixed bottom-0 top-auto z-50 h-[95%] w-[100%] max-w-3xl rounded-b-none rounded-t-3xl  bg-stone-200 shadow-xl dark:bg-stone-900 sm:left-[50%] sm:top-[50%] sm:h-[60%] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-3xl"
          overlayClassName="Overlay"
        >
          <div className="h-full flex-col items-start p-4">
            <div className="pb-4">
              <div
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center opacity-50 transition duration-200 hover:opacity-60"
              >
                <XCircleIcon className="h-8 text-black dark:text-white" />
              </div>
            </div>
            <Input />
          </div>
        </Modal>
      )}
    </div>
  );
}
