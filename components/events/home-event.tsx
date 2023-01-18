import axios from "axios";
import { useAppContext } from "../../context/state";
import { HomeEventType } from "../../types/events";

export default function HomeEvent(props: HomeEventType) {
  const { user, addToast } = useAppContext();

  async function joinHandler() {
    if (!user) {
      addToast({
        status: 403,
        title: "Sign In",
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

  return (
    <>
      <div className="d-inline-flex" style={{ padding: "1rem" }}>
        <div
          className="card"
          style={{
            height: "400px",
            width: "390px",
            backgroundColor: "#e6f9ff",
            boxShadow: "3px 3px 0px #000",
            border: "solid 3px #000000",
          }}
        >
          <img
            className="card-img-top"
            src={
              props.image.includes("http")
                ? props.image
                : `/images/events/${props.image}`
            }
            style={{ objectFit: "cover", width: "100%", height: "300px" }}
            alt="..."
          />
          <div className="card-body">
            <h5 className="fw-bold fs-6">
              {props.isCanceled && "CANCELED"} {props.title} ({props.type}) -{" "}
              {props.points}
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
              })}{" "}
              at {props.location}
            </h6>
            <a href="#" className="mt-2 eventBtn me-2 " onClick={joinHandler}>
              Join
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
