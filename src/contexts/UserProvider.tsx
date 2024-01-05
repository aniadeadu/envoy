import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "../config/firebase.js";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase.js";

const AuthContext = createContext<any>(null);

export const useAuth: any = () => useContext(AuthContext);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const navigate: any = useNavigate();
  const [user, setUser]: any = useState<boolean | null | undefined>(null);
  const [loading, setLoading]: any = useState<boolean>(true);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();

      return await signInWithPopup(auth, provider).then(async (result) => {
        const user = result.user;
        setUser(user);

        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
        await setDoc(doc(db, "users_chats", user.uid), {});
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const Auth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // if you are listening in a realtime operation, you use a cleanup function.
    // Othersise it will cause a memory leaking
    return () => {
      Auth();
    };
  }, [user, navigate]);

  return (
    <AuthContext.Provider value={{ user, setUser, signInWithGoogle }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
export { AuthContext };
