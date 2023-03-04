import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AttendanceModal from "./attendance-modal";
import { DashboardEventType } from "../../../types/events";
import { formatStartAndFinish } from "../../../helpers";
import { KeyedMutator } from "swr";

export default function DashboardEvent(
  props: DashboardEventType & {
    mutate: KeyedMutator<any>;
    setCanceling: Dispatch<SetStateAction<number | undefined>>;
    setShowCancelingModal: Dispatch<SetStateAction<boolean>>;
  }
) {
  const [show, setShow] = useState(false);

  const now = new Date();

  function toggleModal() {
    setShow(!show);
  }

  function handleDelete(pk: number) {
    axios
      .delete(`http://127.0.0.1:8000/api/event/${pk}/destroy/`)
      .then(() => {
        props.mutate();
        toast.success("Event deleted successfully");
      })
      .catch((error) => {
        toast.error(`/event/${pk}/destroy/ (${error.code}): ${error.message}`);
        throw error;
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
          <h6 className="m-auto px-3">
            {props.cancelationReason
              ? "Canceled: "
              : new Date(props.startsOn) < now
              ? "Occurred on"
              : "Scheduled for"}{" "}
            {props.cancelationReason
              ? props.cancelationReason
              : `${formatStartAndFinish(props.startsOn, props.finishesOn)}
            with ${props.participants.length} participants`}
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
            onClick={() => handleDelete(props.pk)}
          >
            Delete
          </button>

          <button
            className={`btn btn-primary mx-1 ${
              props.cancelationReason || new Date(props.startsOn) < now
                ? "disabled"
                : ""
            }`}
            onClick={() => {
              props.setCanceling(props.pk);
              props.setShowCancelingModal(true);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
