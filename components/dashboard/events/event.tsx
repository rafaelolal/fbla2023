import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AttendanceModal from "./attendance-modal";
import { DashboardEventType } from "../../../types/events";
import { toFormattedDatetime } from "../../../helpers";
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

  function handleDelete(id: number) {
    axios
      .delete(`http://127.0.0.1:8000/api/event/${id}/destroy/`)
      .then(() => {
        props.mutate();
        toast.success("Event deleted successfully");
      })
      .catch((error) => {
        toast.error(`/event/${id}/destroy/ (${error.code}): ${error.message}`);
        throw error;
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

      <div className="row justify-content-around py-3  px-3 border-bottom">
        <div className="col-3 d-flex">
          <h6 className="my-auto">{props.title}</h6>
        </div>

        <div className="col-3 d-flex">
          <h6 className="my-auto">{toFormattedDatetime(props.startsOn)}</h6>
        </div>

        <div className="col-3 d-flex">
          <h6 className="my-auto">{toFormattedDatetime(props.finishesOn)}</h6>
        </div>

        <div className="col-3 d-flex">
          <div className="m-auto">
            <button
              className={`btn eventBtn mx-1 ${
                props.participants.some((o) => o.final) ||
                new Date(props.startsOn) > now
                  ? "disabledBtn"
                  : ""
              }`}
              style={{ height: "fit-content" }}
              onClick={toggleModal}
            >
              Attendance
            </button>

            <button
              className={`btn eventBtn mx-1 ${
                new Date(props.startsOn) < now ? "disabledBtn" : ""
              }`}
              style={{ height: "fit-content" }}
              onClick={() => handleDelete(props.id)}
            >
              Delete
            </button>

            <button
              className={`btn eventBtn mx-1 ${
                props.cancelationReason || new Date(props.startsOn) < now
                  ? "disabledBtn"
                  : ""
              }`}
              style={{ height: "fit-content" }}
              onClick={() => {
                props.setCanceling(props.id);
                props.setShowCancelingModal(true);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
