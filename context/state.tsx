import { Context, createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { MyToastType } from "../components/toasts/types";
import ToastList from "../components/toasts/toast-list";

type ToastListType = MyToastType[];
type ContextType = {
  user: User | null;
  addToast: (toast: MyToastType) => void;
  rallyTime: Date;
  setRallyTime: Dispatch<SetStateAction<Date>>;
};

let AppContext: Context<ContextType>;

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [toasts, setToasts] = useState<ToastListType>([]);
  const [rallyTime, setRallyTime] = useState(new Date());

  const sharedState = {
    user,
    addToast,
    rallyTime,
    setRallyTime,
  };

  AppContext = createContext(sharedState);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
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
