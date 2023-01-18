import { MutableRefObject, useRef, useState } from "react";
import axios from "axios";
import AttendanceModal from "./attendance-modal";
import { DashboardEventType } from "../../../types/events";

export default function DashboardEvent(props: DashboardEventType) {
  const [canceling, setCanceling] = useState(false);
  const cancelingRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const [show, setShow] = useState(false);

  const now = new Date();

  function toggleModal() {
    setShow(!show);
  }

  function deleteHandler(id: number) {
    axios
      .post("/api/deleteEvent", {
        id,
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

  function cancelHandler(id: number, reason: string) {
    axios
      .post("/api/cancelEvent", {
        id,
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
    <>
      <AttendanceModal
        id={props.id}
        toggleModal={toggleModal}
        show={show}
        participants={props.participants}
      />

      <div className="col-4" style={{ padding: "1rem" }}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">
              {new Date(props.start) < now ? "Occurred on" : "Scheduled for"}{" "}
              {new Date(props.start).toLocaleString(undefined, {
                timeZone: "UTC",
                year: "numeric",
                month: "long",
                day: "2-digit",
                weekday: "long",
              })}{" "}
              with {props.participants.length} participants
            </p>

            <button
              className={`btn btn-primary me-2 ${
                new Date(props.start) > now ? "disabled" : ""
              }`}
              onClick={toggleModal}
            >
              Mark Attendance
            </button>

            <button
              className={`btn btn-primary me-2 ${
                new Date(props.start) < now ? "disabled" : ""
              }`}
              onClick={() => deleteHandler(props.id)}
            >
              Delete
            </button>

            <button
              className={`btn btn-primary me-2 ${
                new Date(props.start) < now ? "disabled" : ""
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
          </div>
        </div>
      </div>
    </>
  );
}
