import { MutableRefObject, useRef } from "react";
import { useAppContext } from "../../context/state";
import { auth } from "../../firebaseConfig";
import AddNewsForm from "./add-news-form";

export default function DashboardHome() {
  const { user, setRallyTime } = useAppContext();

  const dateRef = useRef() as MutableRefObject<HTMLInputElement>;
  const timeRef = useRef() as MutableRefObject<HTMLInputElement>;

  return (
    <>
      <div className="row justify-content-center mx-5">
        <div className="col-2 m-3 p-3 neoBorder">
          <h3>Signed In Status</h3>
          <p>Signed in: {Boolean(user).toString()}</p>
          {user && (
            <>
              <p>Signed in as: {user.email}</p>
              <button
                className="btn eventBtn"
                onClick={() => {
                  auth.signOut();
                }}
              >
                Sign Out
              </button>
            </>
          )}
        </div>

        <div className="col-6 m-3 p-3 neoBorder">
          <div>
            <h3>Set Next Rally Date</h3>
            <form
              onSubmit={function (event) {
                event.preventDefault();
                setRallyTime(
                  new Date(`${dateRef.current.value}T${timeRef.current.value}`)
                );
              }}
            >
              <input
                type="date"
                className="form-control my-2"
                required
                ref={dateRef}
              />
              <input type="time" required ref={timeRef} />
              <button className="btn eventBtn mx-3" type="submit">
                Set
              </button>
            </form>
          </div>
        </div>

        <div className="col-8 m-3 p-3 neoBorder">
          <h3>Add News</h3>
          <AddNewsForm />
        </div>
      </div>
    </>
  );
}
