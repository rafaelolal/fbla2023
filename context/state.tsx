import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import ToastType from "../components/toast";

type contextType = {
  loggedIn: boolean;
};

type ToastType = { status: number | null; message: string | null };

const AppContext = createContext<contextType>({ loggedIn: false });

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [toast, setToast] = useState<ToastType>({
    message: null,
    status: null,
  });

  let sharedState = {
    loggedIn,
    setToast,
  };

  useEffect(() => {
    if (toast.status) {
      const timer = setTimeout(() => {
        setToast({ message: null, status: null });
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [toast]);

  onAuthStateChanged(auth, (user) => {
    console.log("onAuthStateChanged executed")
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  return (
    <>
      {toast.message && (
        <ToastType status={toast.status!} message={toast.message} />
      )}
      <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
    </>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
