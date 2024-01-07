import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext, useAuth } from "../../contexts/UserProvider";
import { ConversationContext } from "../../contexts/ConversationContext";
import { v4 as uuid } from "uuid";
import friends from "../../assets/images/friends.png";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../config/firebase";
import {
  collection,
  getDocs,
  getDoc,
  query,
  setDoc,
  doc,
  updateDoc,
  where,
  serverTimestamp,
  onSnapshot,
  arrayUnion,
  Timestamp,
  getDocsFromServer,
  limit,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import {
  CardImage,
  File,
  FileEarmarkDiff,
  FileFill,
  FileImage,
  FileImageFill,
  Paperclip,
  Send,
} from "react-bootstrap-icons";

export const Messages = ({
  messages,
  messageGroups,
  formatDateTime,
  user,
}: any) => {
  const scrollRef = useRef<any>();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {messages.length <= 0 ? (
        <div className="w-full flex justify-center items-center h-full">
          <div className="bg-[#f9f9f9]  flex flex-col justify-center items-center w-[90%] lg:w-72  px-10  rounded-lg py-10 backdrop-blur-md">
            <div className="font-medium">No messages here yet...</div>
            <div className="text-center leading-tight">
              Send a message or search for friend to chat with.
            </div>
            <img
              src={friends}
              alt="Friends together"
              className="w-64 mt-5 rounded-2xl h-auto"
            />
          </div>
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="w-full justify-between h-[calc(100%-3rem)]  flex flex-col   "
        >
          <div className="flex flex-col  py-1 overflow-y-scroll px-4   w-full">
            {messageGroups.map((group: any) => (
              <div key={group.date}>
                <h4 className="text-center text-[0.95rem]  text-[rgba(70,70,70)]">
                  {group.date}
                </h4>
                {group.messages.map((m: any) => {
                  if (m.senderId === user.uid) {
                    return (
                      <>
                        {m.attachment ? (
                          <div className="w-full flex flex-col items-end">
                            <div className=" max-w-[90%] md:max-w-[65%] lg:w-[45%] flex flex-col gap-5 items-end">
                              <div ref={scrollRef}>
                                {m.fileType == "image" ? (
                                  <img
                                    src={m.attachment}
                                    height={400}
                                    width={400}
                                  />
                                ) : m.fileType == "audio" ? (
                                  <audio controls>
                                    <source src={m.attachment} />
                                  </audio>
                                ) : m.fileType == "video" ? (
                                  <video width={400} height={400} controls>
                                    <source src={m.attachment} />
                                  </video>
                                ) : (
                                  <div>{m.attachment}</div>
                                )}
                              </div>
                              <div className="text-[0.6rem] text-[#4b4b4b]  tracking-[-0.011rem]">
                                {formatDateTime(m.date?.toDate())}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full flex flex-col my-3 items-end">
                            <div className="max-w-[90%] lg:max-w-[45%] ">
                              <div className=" bg-[#baffc9eb] py-[0.4rem] flex items-end  justify-between  px-4   rounded-[1.67rem]  rounded-br-none">
                                <div
                                  ref={scrollRef}
                                  className="text-[1.05rem] break-all  pr-3 tracking-[-0.011rem]"
                                  key={m.id}
                                >
                                  {m.text}
                                </div>

                                <div className="text-[0.6rem] text-[#4b4b4b]  tracking-[-0.011rem]">
                                  {formatDateTime(m.date?.toDate())}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}{" "}
                      </>
                    );
                  } else {
                    return (
                      <>
                        {m.attachment ? (
                          <div className="w-full flex flex-col my-3 items-start">
                            <div className="w-[90%] md:max-w-[65%] object-fit lg:w-[45%] flex flex-col items-start">
                              <div ref={scrollRef}>
                                {m.fileType == "image" ? (
                                  <img
                                    src={m.attachment}
                                    className="w-full h-full"
                                  />
                                ) : m.fileType == "audio" ? (
                                  <audio controls>
                                    <source src={m.attachment} />
                                  </audio>
                                ) : m.fileType == "video" ? (
                                  <video controls>
                                    <source
                                      src={m.attachment}
                                      className="w-full h-full"
                                    />
                                  </video>
                                ) : (
                                  <div>{m.attachment}</div>
                                )}
                              </div>
                              <div className="text-[0.6rem] md:text-[0.65rem] lgtext-[0.8rem] flex w-full justify-end text-[#4b4b4b] tracking-[-0.011rem]">
                                {formatDateTime(m.date?.toDate())}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full flex flex-col my-3  items-start">
                            <div className="max-w-[90%] lg:max-w-[45%]">
                              <div className="  bg-[#e4e4e4] flex items-end  justify-between px-4 py-[0.4rem] rounded-[1.67rem] rounded-tl-none ">
                                <div
                                  className="  text-[1.05rem] pr-3  break-all tracking-[-0.011rem] "
                                  key={m.id}
                                >
                                  {m.text}
                                </div>
                                <div className="text-[0.6rem] text-[#4b4b4b]  tracking-[-0.011rem]">
                                  {formatDateTime(m.date?.toDate())}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}{" "}
                      </>
                    );
                  }
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
