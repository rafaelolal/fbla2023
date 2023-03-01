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
      <div className="row justify-content-center">
        <div className="col-8 mt-4 mb-2">
          <div className="row">
            <div className="col-12 col-md me-0 me-md-4 p-4 mb-4 mb-md-0 neoBorder">
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

            <div className="col-12 col-md-8 p-4 neoBorder">
              <h3>Set Next Rally Date</h3>
              <form
                onSubmit={function (event) {
                  event.preventDefault();
                  setRallyTime(
                    new Date(
                      `${dateRef.current.value}T${timeRef.current.value}`
                    )
                  );
                }}
              >
                <div className="row">
                  <div className="col-12 col-md-6 my-2">
                    <input
                      type="date"
                      className="form-control w-100 h-100"
                      required
                      ref={dateRef}
                    />
                  </div>
                  <div className="col-12 col-md-6 my-2">
                    <input
                      className="w-100 h-100"
                      type="time"
                      required
                      ref={timeRef}
                    />
                  </div>
                </div>
                <button
                  className="btn eventBtn my-3"
                  style={{ width: "60px" }}
                  type="submit"
                >
                  Set
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-8 p-4 mb-4 mt-3 neoBorder">
          <h3>Add News</h3>
          <AddNewsForm />
        </div>
      </div>
    </>
  );
}
