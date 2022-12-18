import { MutableRefObject, useRef } from "react";
import { useAppContext } from "../../context/state";
import { auth } from "../../firebaseConfig";
import AddEventForm from "../events/add-event-form";
import StudentSignUp from "./student-sign-up";

export default function DashboardHome() {
  const { user, setRallyTime } = useAppContext();

  const dateRef = useRef() as MutableRefObject<HTMLInputElement>;
  const timeRef = useRef() as MutableRefObject<HTMLInputElement>;

  return (
    <>
      <div className="my-3 p-3" style={{ border: "solid 1px" }}>
        <p>Signed in: {Boolean(user).toString()}</p>
        {user && (
          <>
            <p>Signed in as: {user.email}</p>
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
      </div>

      <div className="my-3 p-3" style={{ border: "solid 1px" }}>
        <div>
          <p>SET NEXT RALLY DATE</p>
          <input type="date" className="form-control" required ref={dateRef} />
          <input type="time" required ref={timeRef} />
          <button
            className="btn btn-primary"
            onClick={() =>
              setRallyTime(
                new Date(`${dateRef.current.value}T${timeRef.current.value}`)
              )
            }
          >
            Set
          </button>
        </div>
      </div>

      <div className="my-3 p-3" style={{ border: "solid 1px" }}>
        <StudentSignUp />
      </div>

      <div className="my-3 p-3" style={{ border: "solid 1px" }}>
        <AddEventForm />
      </div>
    </>
  );
}
