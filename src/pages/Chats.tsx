import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext, useAuth } from "../contexts/UserProvider";
import { v4 as uuid } from "uuid";
import friends from "../assets/images/friends.png";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
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
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../config/firebase";
import { db } from "../config/firebase";
import { ConversationContext } from "../contexts/ConversationContext";
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
import { Messages } from "../components/ui/Meesages";
import { Inputs } from "../components/ui/Inputs";
import { userInfo } from "os";

// import {  auth } from "../config/firebase";

export const Chats = () => {
  const { UserId } = useParams<{ UserId: any }>();
  const navigate = useNavigate();
  const { user, setUser, signInWithGoogle }: any = useContext(AuthContext);
  const { dispatch, data }: any = useContext(ConversationContext);
  const [text, setText]: any = useState<[] | string | number>("");
  const [file, setFile]: any = useState<any>();
  const [messages, setMessages]: any = useState<any>([]);
  const [img, setImg]: any = useState<FileList | null | undefined>();
  const [previewURL, setPreviewURL] = useState("");
  const [fileType, setFileType] = useState("");
  const [userYouHaveNotChattedWith, setUserYouHaveNotChattedWith] =
    useState<any>();
  const [msg, setnomessages]: any = useState<any>([]);
  const [date, setDate]: any = useState<any>([]);
  const [messageHead, setMessageHead]: any = useState<string>("");
  const auth = getAuth();
  const [username, setUserName]: any = useState<any>("");
  const [userr, setUserr]: any = useState<
    string | boolean | null | undefined
  >();
  const [err, setErr]: any = useState<boolean>(false);
  const [chats, setChats]: any = useState<{} | string | null | undefined>([]);
  const scrollRef = useRef<any>();
  interface Conversation {
    id?: string;
    participants: string[];
    timestamp?: any;
  }

  const sortedMessages = messages.sort(
    (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const isToday = (someDate: Date): boolean => {
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  };

  const isYesterday = (someDate: Date): boolean => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (
      someDate.getDate() === yesterday.getDate() &&
      someDate.getMonth() === yesterday.getMonth() &&
      someDate.getFullYear() === yesterday.getFullYear()
    );
  };

  const messageGroups: any[] = [];
  let currentDate: any = null;

  sortedMessages.forEach((message: any) => {
    const messageDate = message.date.toDate();
    let formattedDate: string;

    if (isToday(messageDate)) {
      formattedDate = "Today";
    } else if (isYesterday(messageDate)) {
      formattedDate = "Yesterday";
    } else {
      formattedDate = messageDate.toDateString();
    }

    if (formattedDate !== currentDate) {
      currentDate = formattedDate;
      messageGroups.push({
        date: currentDate,
        messages: [message],
      });
    } else {
      messageGroups[messageGroups.length - 1].messages.push(message);
    }
  });

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setDate(new Date());
  }, []);

  // This useEffect is used to get the chat between two users
  useEffect(() => {
    const userInfo = async (id: string) => {
      const q = query(
        collection(db, "users"),
        where("uid", "==", id),
        limit(1)
      );
      try {
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs[0].data();
      } catch (err) {
        console.log(err);
      }
    };

    const getChats = async () => {
      const q = query(
        collection(db, "chats"),
        where("participants", "array-contains", user.uid)
      );

      const docSnap = await getDocs(q);

      const conversations: any[] = [];

      docSnap.forEach(async (doc) => {
        let user2Id = doc.data().participants.find((id: string) => {
          if (id != user.uid) {
            return id;
          }
        });

        let messages = doc.data().messages;

        let userProfile = await userInfo(user2Id);
        conversations.push({
          id: doc.id,
          userProfile,
          messages,
          participants: [user.uid, userProfile?.uid],
        });
        console.log(conversations);
        setChats([...conversations]);
      });

      //    const docRef = doc(db, "users_chats", user.uid)
      // const docSnap = await  getDoc(docRef);
      // if (docSnap.exists()) setChats(docSnap.data())
    };

    user && getChats();
  }, [user]);

  useEffect(() => {
    const getUsers = async () => {
      const q = query(collection(db, "users"));
      try {
        const querySnapshot = await getDocs(q);
        const allUsers = querySnapshot.docs.map((doc) => doc.data());
        console.log(chats);
        // Get the list of users you have chatted with
        const usersYouHaveChattedWith = new Set();
        chats.forEach((chat: any) => {
          const participantsIds = chat.participants.map(
            (participant: any) => participant
          );
          participantsIds.forEach((id: any) => usersYouHaveChattedWith.add(id));
        });

        // Filter out users you have chatted with
        const usersYouHaveNotChattedWith = allUsers.filter(
          (user) => !usersYouHaveChattedWith.has(user.uid)
        );

        setUserYouHaveNotChattedWith(usersYouHaveNotChattedWith);
      } catch (error) {
        console.error("Error getting users:", error);
      }
    };

    user && chats && getUsers();
  }, [user, chats]);

  // useEffect(() => {
  //   console.log(chats);
  // }, [chats]);
  console.log(userYouHaveNotChattedWith);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    //clean up function
    // return () => {
    //    unsub();
    // }
  }, [data.chatId]);

  const handleSend = async () => {
    if (previewURL !== "" && img) {
      const storageRef = ref(storage, img[0].name);
      const uploadTask = uploadBytesResumable(storageRef, img[0]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded/     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...

          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: user.uid,
                date: Timestamp.now(),
                attachment: downloadURL,
                fileType: fileType,
              }),
            });
            await updateDoc(doc(db, "users_chats", user.uid), {
              [data.chatId + ".lastMessage"]: {
                previewURL,
              },
              [data.chatId + ".date"]: serverTimestamp(),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: user.uid,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db, "users_chats", user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setPreviewURL("");
    setImg(null);
  };

  function formatDateTime(dateTime: Date): string {
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const seconds = dateTime.getSeconds();

    // Function to add leading zeros
    const addLeadingZero = (value: number): string =>
      value < 10 ? `0${value}` : `${value}`;

    // Format the time
    const formattedTime = `${addLeadingZero(hours)}:${addLeadingZero(minutes)}`;

    return formattedTime;
  }

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserr(doc.data());
        // console.log(doc.data())
      });
    } catch (err) {}
  };

  const handleKeyDownForSearch = (e: any) => {
    if (e.code === "Enter") return handleSearch();
  };
  const handleKeyDownForSend = (e: any) => {
    if (e.code === "Enter") return handleSend();
  };

  const handleClick = async () => {
    //check wwhether the group(chats in firestore) exists, othewise create new one
    const combinedId =
      user.uid > userr.uid ? user.uid + userr.uid : userr.uid + user.uid;
    console.log(user);
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), {
          messages: [],
          participants: [user.uid, userr.uid],
        });
      }
      //create user chats
      await updateDoc(doc(db, "users_chats", user.uid), {
        [combinedId + ".userInfo"]: {
          uid: userr.uid,
          displayName: userr.displayName,
          photoURL: userr.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "users_chats", userr.uid), {
        [combinedId + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },

        [combinedId + ".date"]: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }

    setUserr(null);
    setUserName("");
  };

  const handleSelect = (u: any, i: string): void => {
    dispatch({ type: "CHANGE_USER", payload: u });
    navigate(`/chat/${i}`);
  };

  useEffect(() => {
    if (UserId) {
      const getCurrentChat = async () => {
        const userInfo = async (id: string) => {
          const q = query(
            collection(db, "users"),
            where("uid", "==", id),
            limit(1)
          );
          try {
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs[0].data();
          } catch (err) {
            console.log(err);
          }
        };

        let userinfo2 = await userInfo(UserId);
        console.log(userinfo2);
        dispatch({ type: "CHANGE_USER", payload: userinfo2 });
      };

      getCurrentChat();
    }
  }, [UserId]);

  useEffect(() => {
    if (img !== undefined && img != null) {
      setPreviewURL(URL.createObjectURL(img[0]));
      setFileType(img[0].type.split("/")[0]);
    }
  }, [img]);

  const m = data.us?.displayName ? "block" : "hidden";

  return (
    <div className="w-full relative overflow-x-hidden bg-[#fffff8] py-10 h-screen ">
      <div className="w-[95%] bg-[#ffffc508] relative z-20 overflow-y-hidden shadow-[0_20px_25px_-10px_rgba(0,0,0,0.15),_15px_0px_30px_-10px_rgba(0,0,0,0.15)] mx-auto flex border h-full  rounded-xl">
        <div className=" px-2 bg-[#ffffc508] flex flex-col py-8 h-full pt-4 pb-2 w-[23.5%]">
          <header>
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={user.photoURL}
                  alt="user photo"
                  className="w-9 h-auto rounded-full"
                />
                <div className="">
                  {user ? user.displayName.split(" ")[0] : navigate("/")}
                </div>
              </div>
              <div
                onClick={() => {
                  try {
                    signOut(auth);
                  } catch (err) {
                    console.log(err);
                  }
                }}
                className="cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  fill="#585454"
                >
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                </svg>
              </div>
            </div>
          </header>

          <div className="w-full  mt-10">
            <div className="bg-transparent">
              <input
                type="text"
                placeholder="Search"
                value={username}
                onKeyDown={handleKeyDownForSearch}
                onChange={(e) => setUserName(e.target.value)}
                className="rounded-3xl border border-[#d5d5d5]   bg-[#efefef]  w-full focus:outline-none py-1 px-4"
              />
            </div>
            {err && <div className="text-black text-xl">User not found</div>}
            {userr && (
              <div className="flex gap-3 cursor-pointer" onClick={handleClick}>
                <img src={userr.photoURL} className="w-10 h-10 rounded-full" />

                <div className="text-black text-xl">{userr.displayName}</div>
              </div>
            )}
          </div>
          <div className=" w-full mt-8 rounded-xl overflow-y-scroll  h-full  bg-[#e0e0e099]">
            {chats.map((chat: any) => {
              return (
                <div
                  className="w-full overflow-x-hidden flex flex-col cursor-pointer"
                  onClick={() => {
                    handleSelect(chat.userProfile, chat.userProfile.uid);
                  }}
                >
                  <div className="w-full px-4 items-center justify-between  flex">
                    <div
                      className="flex py-4  gap-3 items-center "
                      key={chat.id}
                    >
                      <img
                        src={chat?.userProfile?.photoURL}
                        alt="hi"
                        className="w-12 rounded-full"
                      />
                      <div>
                        <div className="text-[1.05rem] font-medium ">
                          {chat?.userProfile?.displayName}
                        </div>
                        <div className="text-sm text-[rgba(20,20,20,.8)] truncate ">
                          {chat.messages[chat.messages.length - 1].text}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-[#4b4b4b]  tracking-[-0.011rem]">
                      {" "}
                      {formatDateTime(
                        chat.messages[chat.messages.length - 1].date.toDate()
                      )}
                    </div>
                  </div>
                  <div className="border-b border-[#c9c9c9] w-full h-[0.1rem]" />
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-[77%] relative overflow-y-hidden  bg-transparent h-full px-2 py-2 ">
          <div className=" w-full h-full  flex-col flex justify-between space-y-3">
            <div
              className={
                "flex max-w-fit items-center gap-3 py-[0.3rem] rounded-3xl bg-[#e9e9e980] px-4 " +
                m
              }
            >
              <img
                src={data.us?.photoURL}
                alt={data.us?.displayName + "'s profile picture"}
                className="w-9 rounded-full h-auto"
              />
              <div className="text-[1.05rem] font-medium text-black">
                {data.us?.displayName}
              </div>
            </div>
            <div className="flex justify-between  border-[#d2d2d2] h-full overflow-y-hidden rounded-2xl border py-3  bg-[#e9e9e980] backdrop-blur-2xl z-10 relative   flex-col ">
              <Messages
                messages={messages}
                messageGroups={messageGroups}
                formatDateTime={formatDateTime}
                user={user}
              />
              <Inputs
                data={data}
                previewURL={previewURL}
                fileType={fileType}
                img={img}
                setImg={setImg}
                text={text}
                setText={setText}
                handleSend={handleSend}
                handleKeyDownForSend={handleKeyDownForSend}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
