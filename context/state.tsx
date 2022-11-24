import { createContext, SetStateAction, useContext, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

type contextType = {
  loggedIn: boolean;
};

const AppContext = createContext<contextType>({ loggedIn: false });

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false);

  let sharedState = {
    loggedIn,
  };

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  return (
    <>
      <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
    </>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
