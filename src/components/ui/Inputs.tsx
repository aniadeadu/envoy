import { Paperclip, Send } from "react-bootstrap-icons";

export const Inputs = ({
  data,
  previewURL,
  fileType,
  img,
  setImg,
  text,
  setText,
  handleSend,
  handleKeyDownForSend,
}: any) => {
  return (
    <div className="w-full">
      {data.us.displayName && (
        <div className="w-full px-3 flex ">
          <div className="flex w-full gap-2 md:gap-4 ">
            <div className="w-[90%] resize-none  break-all overflow-y-scroll    rounded-3xl bg-[#fdfdfd] ">
              {previewURL !== "" &&
                (fileType == "image" ? (
                  <img
                    src={previewURL}
                    className="py-3 px-5"
                    height={200}
                    width={200}
                  />
                ) : fileType == "audio" ? (
                  <audio controls>
                    <source src={previewURL} />
                  </audio>
                ) : fileType == "video" ? (
                  <video width={200} height={200} controls>
                    <source src={previewURL} />
                  </video>
                ) : (
                  <div>{previewURL}</div>
                ))}
              <textarea
                placeholder="Send a chat"
                rows={1}
                value={text}
                onKeyDown={handleKeyDownForSend}
                onChange={(e) => setText(e.target.value)}
                className="w-[100%] border-t resize-none  h-full py-0 md:py-1 break-all overflow-y-scroll px-2 md:px-5 focus:border-0 outline-0"
              ></textarea>
            </div>
            <div className="flex gap-3 justify-center items-center">
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files !== null) setImg(e.target.files);
                }}
                accept="audio/*,video/*,image/*"
                className="hidden"
                id="file"
              />
              <label htmlFor="file">
                <div className="bg-[#fff] border cursor-pointer   px-1 py-1 md:px-2 md:py-2  rounded-full">
                  <Paperclip
                    fill="#ffaa4f"
                    className="text-[1.1rem] rotate-45"
                  />
                </div>
              </label>
              <div>
                <div
                  onClick={handleSend}
                  className="bg-[#fff] cursor-pointer  border px-1 py-1 md:px-2 md:py-2  rounded-full"
                >
                  <Send fill="#0e96ffd8" className="text-[1.1rem]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
