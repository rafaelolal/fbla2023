import { useAppContext } from "../../context/state";
import { auth } from "../../firebaseConfig";
import StudentSignUp from "./studentSignUp";

export default function DashboardHome() {
  const { user } = useAppContext();

  return (
    <>
      <p>Signed in: {Boolean(user).toString()}</p>
      {user && (
        <>
          <p>Signed in as: {user.email}</p> <p>Admin:</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              auth.signOut();
            }}
          >
            Sign Out
          </button>
        </>
      )}
      <StudentSignUp />
    </>
  );
}
