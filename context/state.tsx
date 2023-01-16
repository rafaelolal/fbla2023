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
import { MyToastType } from "../types/toasts";
import ToastList from "../components/toasts/toast-list";
import { isAdmin } from "../prisma/helpers";

type ToastListType = MyToastType[];
type ContextType = {
  user: User | null;
  isA: boolean;
  addToast: (toast: MyToastType) => void;
  rallyTime: Date;
  setRallyTime: Dispatch<SetStateAction<Date>>;
};

let AppContext: Context<ContextType>;

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [toasts, setToasts] = useState<ToastListType>([]);
  const [rallyTime, setRallyTime] = useState(new Date());
  const [isA, setIsA] = useState(false);

  const sharedState = {
    user,
    addToast,
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
          console.log(result);
          setIsA(result);
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  function addToast(toast: MyToastType) {
    setToasts(toasts.concat([toast]));
  }

  function removeToast() {
    setToasts(toasts.slice(1, toasts.length));
  }

  return (
    <>
      {toasts && <ToastList toasts={toasts} removeToast={removeToast} />}
      <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
    </>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
