import axios from "axios";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/state";
import { HomeEventType } from "../../types/events";

export default function HomeEvent(props: HomeEventType) {
  const { user } = useAppContext();

  async function joinHandler() {
    if (!user) {
      toast.warning(`Sign in before joining an event`);
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
          `Axios add StudentOnEvents (${error.code}: ${error.message})`
        );
      });
  }

  return (
    <>
      <div
        className="d-inline-flex justify-content-center"
        style={{ padding: "1rem" }}
      >
        <div
          className="card eventEffect"
          style={{
            height: "400px",
            width: "390px",
            backgroundColor: "#e6f9ff",
            borderRadius: "7px",
          }}
        >
          <img
            className="card-img-top"
            src={
              props.image.includes("http")
                ? props.image
                : `/images/events/${props.image}`
            }
            style={{
              objectFit: "cover",
              width: "100%",
              height: "300px",
              borderTopRightRadius: "7px",
              borderTopLeftRadius: "7px",
              borderBottom: "solid 3px #000",
            }}
            alt="Event Image"
          />
          <div className="card-body">
            <h5 className="fw-bold fs-6">
              {props.isCanceled && "CANCELED"} {props.title} ({props.type}) -{" "}
              <span className="text-tertiary"> {props.points} </span> points
            </h5>
            <h6
              className="text-start fs-6"
              style={{
                height: "fit-content",
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
            <a className="mt-2 eventBtn me-2 " onClick={joinHandler}>
              Join
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
