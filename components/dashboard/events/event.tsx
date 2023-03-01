import { MutableRefObject, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AttendanceModal from "./attendance-modal";
import { DashboardEventType } from "../../../types/events";
import { formatStartAndFinish } from "../../../helpers";

export default function DashboardEvent(props: DashboardEventType) {
  const [canceling, setCanceling] = useState(false);
  const cancelingRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const [show, setShow] = useState(false);

  const now = new Date();

  function toggleModal() {
    setShow(!show);
  }

  function deleteHandler(pk: number) {
    axios
      .delete(`http://127.0.0.1:8000/api/event/${pk}/destroy/`)
      .then(function (response) {
        if (response.status == 200) {
          toast.success("Event deleted successfully");
          props.mutate();
        }
      })
      .catch(function (error) {
        toast.error(`deleteEvent (${error.code}): ${error.message}`);
      });
  }

  function cancelHandler(pk: number, cancellationReason: string) {
    axios
      .patch(`http://127.0.0.1:8000/api/event/${pk}/cancel/`, {
        cancellationReason,
      })
      .then(function (response) {
        if (response.status == 200) {
          toast.success("Canceled event successfully");
          props.mutate();
          setCanceling(false);
        }
      })
      .catch(function (error) {
        toast.error(`cancelEvent (${error.code}): ${error.message}`);
      });
  }

  return (
    <>
      <AttendanceModal
        pk={props.pk}
        toggleModal={toggleModal}
        show={show}
        participants={props.participants}
      />

      <div className="row justify-content-around py-3  px-3 border-bottom">
        <div className="col-3 d-flex">
          <h5 className="my-auto">{props.title}</h5>
        </div>

        <div className="col-5 d-flex ">
          <h6 className="m-auto">
            {props.cancellationReason
              ? "Cancelled: "
              : new Date(props.startsOn) < now
              ? "Occurred on"
              : "Scheduled for"}{" "}
            {props.cancellationReason
              ? props.cancellationReason
              : formatStartAndFinish(props.startsOn, props.finishesOn)}{" "}
            with ${props.participants.length} participants
          </h6>
        </div>

        <div className="col-4 d-flex">
          <button
            className={`btn btn-primary mx-1 ${
              props.participants.some((o) => o.final) ||
              new Date(props.startsOn) > now
                ? "disabled"
                : ""
            }`}
            onClick={toggleModal}
          >
            Attendance
          </button>

          <button
            className={`btn btn-primary mx-1 ${
              new Date(props.startsOn) < now ? "disabled" : ""
            }`}
            onClick={() => deleteHandler(props.pk)}
          >
            Delete
          </button>

          <button
            className={`btn btn-primary mx-1 ${
              props.cancellationReason || new Date(props.startsOn) < now
                ? "disabled"
                : ""
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
                  cancelHandler(props.pk, cancelingRef.current.value)
                }
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
