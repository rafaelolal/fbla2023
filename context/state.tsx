import {
  Context,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { isAdmin } from "../helpers";

type ContextType = {
  user: User | null;
  isA: boolean;
};

let AppContext: Context<ContextType>;

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isA, setIsA] = useState(false);

  const sharedState = {
    user,
    isA,
  };

  AppContext = createContext(sharedState);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        isAdmin(user.uid).then(function (result) {
          setIsA(result);
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <>
      <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
    </>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
