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
    <div className="col-8" style={{ padding: "1rem" }} id={props.pk.toString()}>
      <div
        className="row eventEffect"
        style={{
          height: "13rem",
          backgroundColor: "#56becd",
          overflow: "hidden",
          borderRadius: "7px",
        }}
      >
        <div className="col-4" style={{ height: "13rem", padding: "0" }}>
          <img
            src={props.image.includes("http") ? props.image : `${props.image}`}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              borderRight: "solid 3px #000",
            }}
            alt="Event Image"
          />
        </div>

        <div
          className="col-6 card-body-right position-relative borRight"
          style={{
            padding: "1rem",
            backgroundColor: "#e6f9ff",
            borderRight: "solid 3px #000",
          }}
        >
          <h5 className="card-title fs-5">
            {props.cancellationReason && "CANCELED"} {props.title} ({props.type}
            ) - <span className="text-tertiary">{props.points}</span> points
          </h5>

          <p className="card-text">
            {props.cancellationReason
              ? `Cancelation reason: ${props.cancellationReason}`
              : props.description}
          </p>

          <a
            className="btn eventBtnO me-2 position-absolute"
            style={{ top: "70%" }}
            onClick={props.joined ? leaveHandler : joinHandler}
          >
            {props.joined ? "Leave" : "Join"}
          </a>
        </div>

        <div className="col-2 d-flex">
          <h6
            className="my-auto"
            style={{
              textAlign: "center",
              height: "fit-content",
              fontSize: "1rem",
            }}
          >
            {formatStartAndFinish(props.startsOn, props.finishesOn)} at{" "}
            {props.location}
          </h6>
        </div>
      </div>
    </div>
  );
}
