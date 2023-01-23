import {
  Context,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { isAdmin } from "../helpers";

type ContextType = {
  user: User | null;
  isA: boolean;
  rallyTime: Date;
  setRallyTime: Dispatch<SetStateAction<Date>>;
};

let AppContext: Context<ContextType>;

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [rallyTime, setRallyTime] = useState(new Date());
  const [isA, setIsA] = useState(false);

  const sharedState = {
    user,
    isA,
    rallyTime,
    setRallyTime,
  };

  AppContext = createContext(sharedState);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        isAdmin(user.uid).then(function (result) {
          setIsA(result);
        });
        toast.success(`Successfully signed in as ${user.email}`);
      } else {
        setUser(null);
        toast.success(`Successfully signed out`);
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
