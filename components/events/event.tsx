import axios from "axios";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/state";
import { EventType } from "../../types/events";

export default function Event(props: EventType) {
  const { user } = useAppContext();

  async function joinHandler() {
    if (!user) {
      toast.warning("Sign in before joining an event");
      return;
    }

    await axios
      .post("/api/addStudentsOnEvents", {
        eventId: props.id,
        studentId: user.uid,
      })
      .then(function (response) {
        toast.success(response.data.message);
      })
      .catch(function (error) {
        toast.error(
          `Axios add StudentOnEvents Error (${error.code}: ${error.message})`
        );
      });
  }

  return (
    <>
      <div className="col-8" style={{ padding: "1rem" }}>
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
              src={
                props.image.includes("http")
                  ? props.image
                  : `/images/events/${props.image}`
              }
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
              {props.isCanceled && "CANCELED"} {props.title} ({props.type}) -{" "}
              <span className="text-tertiary">{props.points}</span> points
            </h5>

            <p className="card-text">
              {props.isCanceled
                ? `Cancelation reason: ${props.reason}`
                : props.description}
            </p>

            <a
              className="btn eventBtnO me-2 position-absolute"
              style={{ top: "70%" }}
              onClick={joinHandler}
            >
              Join
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
              {new Date(props.start).toLocaleString(undefined, {
                timeZone: "UTC",
                year: "numeric",
                month: "long",
                day: "2-digit",
                weekday: "long",
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              at {props.location}
            </h6>
          </div>
        </div>
      </div>
    </>
  );
}
