import axios from "axios";
import Link from "next/link";
import { MutableRefObject, useRef } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/state";
import { auth } from "../../firebaseConfig";
import AddNewsForm from "./add-news-form";

export default function DashboardHome() {
  const { user } = useAppContext();

  const datetimeRef = useRef() as MutableRefObject<HTMLInputElement>;

  function handleUpdateRally(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios
      .patch("http://127.0.0.1:8000/api/rally/1/update/", {
        startsOn: datetimeRef.current.value,
      })
      .then(() => {
        toast.success("Rally set successfully");
      })
      .catch((error) => {
        toast.error(`/rally/1/update/ (${error.code}): ${error.message}`);
        throw error;
      });
  }

  function updateLeaderboard() {
    axios
      .put("http://127.0.0.1:8000/api/leaderboard/1/update/")
      .then(() => {
        toast.success("Leaderboard updated successfully");
      })
      .catch((error) => {
        toast.error(`/leaderboard/1/update/ (${error.code}): ${error.message}`);
        throw error;
      });
  }

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-8 mt-4 p-0"></div>
        <div className="col-8 mt-4 mb-2">
          <div className="row">
            <div className="col-12 col-md-auto me-0 me-md-4 p-4 mb-4 mb-md-0 neoBorder">
              <h3>Actions</h3>
              <div className="d-flex flex-column">
              
              <button className="btn eventBtn my-2" onClick={updateLeaderboard}>
                Update Leaderboard
              </button>

              <Link href="/rally">
                <button className="btn eventBtn my-2">Access Rally</button>
              </Link>

              {user && (
                <button
                  className="btn eventBtn my-2"
                  onClick={() => {
                    auth.signOut();
                  }}
                >
                  Sign Out
                </button>
              )}
              </div>
            </div>

            <div className="col-12 col-md p-4 neoBorder">
              <h3>Set Next Rally Date</h3>

              <form onSubmit={handleUpdateRally}>
                
                  <div className="col-12 col-md-6 my-3">
                    <input
                      type="datetime-local"
                      className="form-control w-100 h-100"
                      required
                      ref={datetimeRef}
                    />
                  </div>
                

                <button className="btn eventBtn my-3" type="submit">
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
