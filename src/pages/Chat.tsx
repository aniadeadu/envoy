import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext, useAuth } from "../contexts/UserProvider";
import {  v4 as uuid} from 'uuid';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {collection, getDocs, getDoc, query, setDoc, doc, updateDoc,  where, serverTimestamp, onSnapshot, arrayUnion, Timestamp} from "firebase/firestore";
import { db } from "../config/firebase";
import { ConversationContext } from "../contexts/ConversationContext";


// import {  auth } from "../config/firebase";


export const Chats = () => {
   const navigate = useNavigate();
      const { user, setUser, signInWithGoogle}:any = useContext(AuthContext);
      const [text, setText]:any = useState<[] | string | number>("");
      const [file, setFile]:any = useState<any>()
      const {dispatch, data}:any = useContext(ConversationContext);
      const [messages, setMessages]:any  = useState<any>([])
    const auth = getAuth();
    const [username, setUserName]:any = useState<any>("");
    const [userr, setUserr]:any = useState<string | boolean | null | undefined>(null);
    const [err, setErr]:any = useState<boolean>(false);
    const [chats, setChats]:any  = useState<{} | string | null | undefined>([]);
    const ref = useRef()
   
    useEffect(() => {
    
      const getChats = () => {
         
      const unsub = onSnapshot(doc(db, "users_chats", user.uid), (doc) => {
        setChats(doc.data())
      })
      
      //clean up function
      return () => {
         unsub();
      }
      
     
   }
    user && getChats()
    }, [user])

    useEffect(() => {
      
      const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
         doc.exists() && setMessages(doc.data().messages)
      })
      //clean up function
      return () => {
         unsub();
      }
      
    }, [data.chatId])

    const handleSend = async () => {
     
      if(file) {
         await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
               id: uuid(),
               text,
               senderId: user.uid,
               date: Timestamp.now(),
               file: user.photoURL
            })
         })
         
      } else {
         await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
               id: uuid(),
               text,
               senderId: user.uid,
               date: Timestamp.now()
            })
         })

      }
      await updateDoc(doc(db, "users_chats", user.uid), {
         [data.chatId+".lastMessage"]: {
            text
         },
         [data.chatId+".date"]: serverTimestamp(),
      })

      setText("")
      setFile(null)
    }
    const handleSearch = async () => {
      const q = query(collection(db, "users"),
      where("displayName", "==", username));

      try {
         const querySnapshot = await getDocs(q);
         querySnapshot.forEach((doc) => {
            setUserr(doc.data())
            console.log(doc.data())
         })
      } catch(err) {
         
      }
   }

   const handleKeyDown = (e:any) => {
      if (e.code === "Enter") return  handleSearch() 
   }

   console.log(userr)

   const handleClick = async () => {
      //check wwhether the group(chats in firestore) exists, othewise create new one
      const combinedId = user.uid > userr.uid ? user.uid + userr.uid 
      : userr.uid + user.uid;
      try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
         
         await setDoc(doc(db, "chats", combinedId), {messages: []})
      }
      //create user chats
      await updateDoc(doc(db, "users_chats", user.uid), {
         [combinedId +".userInfo"]: {
            uid:userr.uid,
            displayName:userr.displayName,
            photoURL: userr.photoURL
         },
         [combinedId+".date"]: serverTimestamp()
      });
      await updateDoc(doc(db, "users_chats", userr.uid), {
         [combinedId +".userInfo"]: {
            uid:user.uid,
            displayName:user.displayName,
            photoURL: user.photoURL
         },
         [combinedId+".date"]: serverTimestamp()
      });
   } catch (err) {
      console.log(err)
   }
   setUserr(null);
   setUserName("");
   }

   const handleSelect = (u:any) => {
      dispatch({type: "CHANGE_USER", payload:u})

   }
  
   
   return (
      <div className="w-full h-full py-20">
         <div className="w-[80%] h-full mx-auto flex rounded-lg">
            <div className="bg-blue-500 basis-[35%]">
               <header>
                  <div className="py-3 px-3 bg-red">
                  <div className="flex justify-between">
                  <div>Logo</div>
                  <div className="flex gap-4">
                  <div>{user ? user.displayName : navigate('/') }</div>
                  <div onClick={() => { try { signOut(auth);}catch(err) {console.log(err)}  } } className="cursor-pointer"> Logout</div>
                  </div>
                  </div>
                  </div>
               </header>
               <div className="w-full">
               <div className="bg-transparent">
                  <input type="text" placeholder="user"  value={username} onKeyDown={handleKeyDown} onChange={(e) => setUserName(e.target.value)}/>
               </div>
               {err && <div className="text-black text-xl">User not found</div>}
               {userr &&
               <div className="text-black text-xl" onClick={handleClick}>
                  {userr.displayName}
               </div>
}  
               </div>
               <div >
            {
               Object.entries(chats)?.sort((a:any,b:any) => b[1].date - a[1].date).map((chat: any) => {
                  console.log(chat[1].userInfo.displayName)
                  return (
                     <div className="flex cursor-pointer" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                        <img src={chat[1].userInfo.photoURL} alt="hi" className="w-8 rounded-full"/> 
                        <div className="text-lg">{chat[1].userInfo.displayName}</div>
                        <p>{chat[1].lastMessage?.text}</p>   
                        </div>          )    
})
            }
         </div>
            </div>
        
            <div className="bg-blue-200 basis-[65%] flex-col flex justify-between">
               <header>
               <div className="py-3 bg-blue-700 px-3 bg-red">
                  <div className="text-xl text-black">{data.us?.displayName}</div>
                  </div>
               </header>
               <div className="w-full">
                  {
                     messages.map((m:any) => (
                        <div className="text-xl" key={m.id}>{m.text}</div>
                     ))
                  }
               </div>
               <div className="flex justify-between border bg-white">
                  <input type="text" placeholder="something" value={text} onChange={(e) => setText(e.target.value)} className="w-full basis-[80%]  bg-white py-4 px-3"/>
                  <div className="">
                     <input type="file" onChange={(e) => setFile(e.target.value)} className="hidden" id="file"/>
                     <label htmlFor="file">
                        <p>img for file</p>
                     </label>
                  </div>
                  <button onClick={handleSend}>Send</button>
               </div>
            </div>
         </div>
      </div>
   )
}