import { useAppContext } from "../context/state";

import { auth } from "../firebase";

export default function DashboardPage() {
  const { loggedIn } = useAppContext();
  console.table({loggedIn})

  return (
    <>
      <p>Logged in: {loggedIn.toString()}</p>
      {loggedIn && <p>{auth.currentUser!.email}</p>}
      <button className="btn btn-primary" onClick={() => {auth.signOut()}}>Logout</button>
    </>
  );
}
