import axios from "axios";
import { toast } from "react-toastify";
import { KeyedMutator } from "swr";
import { useAppContext } from "../../context/state";
import { formatStartAndFinish } from "../../helpers";
import { EventType } from "../../types/event";

export default function Event(
  props: EventType & {
    joined: boolean;
    attendanceId: number | undefined;
    attendancesMutate: KeyedMutator<any>;
  }
) {
  const { user } = useAppContext();

  async function handleJoin() {
    if (!user) {
      toast.warning("Sign in before joining an event");
      return;
    }

    await axios
      .post("http://127.0.0.1:8000/api/attendance/create/", {
        event: props.id,
        student: user.uid,
      })
      .then(() => {
        props.attendancesMutate();
        toast.success("Joined event successfully");
      })
      .catch(function (error) {
        toast.error(`/attendance/create/ (${error.code}: ${error.message})`);
        throw error;
      });
  }

  async function handleLeave() {
    await axios
      .delete(
        `http://127.0.0.1:8000/api/attendance/${props.attendanceId}/destroy/`
      )
      .then(() => {
        toast.success("Left event successfully");
        props.attendancesMutate();
      })
      .catch((error) => {
        toast.error(
          `/attendance/${props.attendanceId}/destroy/ (${error.code}: ${error.message})`
        );
        throw error;
      });
  }

  return (
    <div
      className="row eventEffect m-4 b-radius-normal"
      style={{
        minHeight: "220px",
      }}
      id={props.id.toString()}
    >
      <div
        className="col-4 p-0"
        style={{
          borderRight: "solid 3px #000",
          minHeight: "100%",
          backgroundImage: `url(${
            props.image.includes("http")
              ? props.image
              : `/images/events/${props.image}`
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div
        className="col-6 card-body-right d-flex flex-column borRight p-3 bg-primary"
        style={{
          borderRight: "solid 3px #000",
        }}
      >
        <h5 className="card-title fs-5">
          {props.cancelationReason && "CANCELED"} {props.title} (
          <span className="text-quaternary">{props.type}</span>) -{" "}
          <span className="text-tertiary">{props.points}</span> points
        </h5>

        <p className="card-text">
          {props.cancelationReason
            ? `Cancelation reason: ${props.cancelationReason}`
            : props.description}
        </p>

        <a
          className="btn eventBtnO mt-auto"
          onClick={props.joined ? handleLeave : handleJoin}
        >
          {props.joined ? "Leave" : "Join"}
        </a>
      </div>

      <div className="col-2 d-flex bg-secondary">
        <h6 className="my-auto text-center fs-6">
          {formatStartAndFinish(props.startsOn, props.finishesOn)} at{" "}
          {props.location}
        </h6>
      </div>
    </div>
  );
}
