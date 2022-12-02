import { useAppContext } from "../context/state";

import { auth } from "../firebaseConfig";

export default function DashboardPage() {
  const { loggedIn } = useAppContext();
  console.table({loggedIn})

  if (!loggedIn) {
    
  }

  return (
    <>
      <p>Logged in: {loggedIn.toString()}</p>
      {loggedIn && <p>{auth.currentUser!.email}</p>}
      <button className="btn btn-primary" onClick={() => {auth.signOut()}}>Sign Out</button>
    </>
  );
}
