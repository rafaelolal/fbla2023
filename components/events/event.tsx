import axios from "axios";
import { toast } from "react-toastify";
import useSWR, { KeyedMutator } from "swr";
import { useAppContext } from "../../context/state";
import { formatStartAndFinish } from "../../helpers";
import { EventType } from "../../types/events";

export default function Event(
  props: EventType & {
    joined: boolean;
    attendancePk: number | null;
    attendancesMutate: KeyedMutator<any>;
  }
) {
  const { user } = useAppContext();

  async function joinHandler() {
    if (!user) {
      toast.warning("Sign in before joining an event");
      return;
    }

    await axios
      .post("http://127.0.0.1:8000/api/attendance/create/", {
        event: props.pk,
        student: user.uid,
      })
      .then(function (response) {
        if (response.status == 201) {
          toast.success("Joined event successfully");
          props.attendancesMutate();
        }
      })
      .catch(function (error) {
        toast.error(`attendance/create/ (${error.code}: ${error.message})`);
      });
  }

  async function leaveHandler() {
    await axios
      .delete(
        `http://127.0.0.1:8000/api/attendance/${props.attendancePk}/destroy/`
      )
      .then(function (response) {
        if (response.status == 204) {
          toast.success("Left event successfully");
          props.attendancesMutate();
        }
      })
      .catch(function (error) {
        toast.error(
          `attendance/${props.attendancePk}/destroy/ (${error.code}: ${error.message})`
        );
      });
  }

  return (
    <>
      <div
        className="row eventEffect bg-secondary m-4 b-radius-normal"
        style={{
          overflow: "hidden",
          minHeight: "220px",
        }}
        id={props.pk.toString()}
      >
        <div
          className="col-4 p-0 position-relative overflow-hidden"
          style={{ borderRight: "solid 3px #000" }}
        >
          <div className="position-absolute">
            <img
              src={
                props.image.includes("http")
                  ? props.image
                  : `/images/events/${props.image}`
              }
              style={{
                objectPosition: "center",
              }}
              alt="Event Image"
            />
          </div>
        </div>

        <div
          className="col-6 card-body-right d-flex flex-column borRight p-3 bg-primary"
          style={{
            borderRight: "solid 3px #000",
          }}
        >
          <h5 className="card-title fs-5">
            {props.cancellationReason && "CANCELED"} {props.title} (
            <span className="text-quaternary">{props.type}</span>) -{" "}
            <span className="text-tertiary">{props.points}</span> points
          </h5>

          <p className="card-text">
            {props.cancellationReason
              ? `Cancelation reason: ${props.cancellationReason}`
              : props.description}
          </p>

          <a
            className="btn eventBtnO mt-auto"
            onClick={props.joined ? leaveHandler : joinHandler}
          >
            {props.joined ? "Leave" : "Join"}
          </a>
        </div>

        <div className="col-2 d-flex">
          <h6
            className="my-auto text-center fs-6"
            style={{
              height: "fit-content",
            }}
          >
            {formatStartAndFinish(props.startsOn, props.finishesOn)} at{" "}
            {props.location}
          </h6>
        </div>
      </div>
    </>
  );
}
