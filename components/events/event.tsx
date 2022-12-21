import axios from "axios";
import { MutableRefObject, useRef, useState } from "react";
import { useAppContext } from "../../context/state";
import { EventPropsType } from "./types";

export default function Event(props: EventPropsType) {
  const { user, addToast } = useAppContext();
  const [canceling, setCanceling] = useState(false);
  const cancelingRef = useRef() as MutableRefObject<HTMLTextAreaElement>;

  const now = new Date();

  async function joinHandler() {
    if (!user) {
      addToast({
        status: 403,
        title: "Sign Im",
        body: "Sign in before joining an event",
      });
      return;
    }

    const result = await axios
      .post("/api/addStudentsOnEvents", {
        eventId: props.id,
        studentId: user.uid,
      })
      .then(function (response) {
        addToast({
          status: response.data.status,
          title: response.data.title,
          body: `${response.data.message}`,
        });
      })
      .catch(function (error) {
        addToast({
          status: 500,
          title: "Axios Add StudentsOnEvents Error",
          body: `Error ${error.code}: ${error.message}`,
        });
      });

    console.log({ studentEventResult: result });
  }

  function deleteHandler(id: string) {
    axios
      .post("/api/deleteEvent", {
        id: parseInt(id),
      })
      .then(function (response) {
        console.log({ deleteEventResponse: response });

        if (response.status == 200) {
          props.mutate();
        }
      })
      .catch(function (error) {
        console.log({ deleteEventError: error });
      });
  }

  function cancelHandler(id: string, reason: string) {
    axios
      .post("/api/cancelEvent", {
        id: parseInt(id),
        reason: reason,
      })
      .then(function (response) {
        console.log({ cancelEventResponse: response });

        if (response.status == 200) {
          props.mutate();
          setCanceling(false);
        }
      })
      .catch(function (error) {
        console.log({ cancelEventError: error });
      });
  }

  return (
    <div className="col-8" style={{padding: "1rem"}}>
      <div className="row" style={{height: "13rem", backgroundColor: "#999999", boxShadow: "5px 5px 0px #000"}} >
        <div className="col-4" style={{height: "13rem", padding: "0"}}>
          <img src={props.image} style={{objectFit: "cover", width: "100%", height: "100%"}} alt="..." />
        </div>

        <div className="col-6 card-body-right" style={{padding: "1rem"}}>
          <h5 className="card-title">
            {props.isCanceled && "CANCELED"} {props.name} ({props.type}) -{" "}
            {props.points}
          </h5>
          
          <p className="card-text">{props.isCanceled ? `Cancelation reason: ${props.reason}` : props.description}</p>

          {!props.isCanceled && props.page == "dashboard" && (
            <>
              <button
                className={`btn btn-primary me-2 ${
                  new Date(props.datetime) > now ? "disabled" : ""
                }`}
              >
                Mark Attendance
              </button>

              <button
                className={`btn btn-primary me-2 ${
                  new Date(props.datetime) < now ? "disabled" : ""
                }`}
                onClick={() => deleteHandler(props.id)}
              >
                Delete
              </button>

              <button
                className={`btn btn-primary me-2 ${
                  new Date(props.datetime) < now ? "disabled" : ""
                }`}
                onClick={() => setCanceling(!canceling)}
              >
                Cancel
              </button>

              {canceling && (
                <>
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      placeholder="Reason for cancelation"
                      id="floatingTextarea"
                      ref={cancelingRef}
                    ></textarea>
                    <label htmlFor="floatingTextarea">Reason</label>
                  </div>

                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      cancelHandler(props.id, cancelingRef.current.value)
                    }
                  >
                    Cancel
                  </button>
                </>
              )}
            </>
          )}

          {props.page == "events" && (
            <a href="#" className="btn btn-primary me-2" onClick={joinHandler}>
              Join
            </a>
          )}
        </div>
        <div className = "col-2 d-flex" >
        <h6 className = "my-auto" style={{ textAlign: "center", height: "fit-content", fontSize: "1rem"}}>
            {new Date(props.datetime).toLocaleString(undefined, {
              timeZone: "UTC",
              year: "numeric",
              month: "long",
              day: "2-digit",
              weekday: "long",
            })}{""}
            at {props.location}
          </h6>
        </div>
      </div>
    </div>
  );
}
