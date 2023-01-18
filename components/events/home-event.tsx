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
      <div className="col-8" style={{ padding: "1rem" }}>
        <div
          className="row"
          style={{
            height: "13rem",
            backgroundColor: "#999999",
            boxShadow: "5px 5px 0px #000",
          }}
        >
          <div className="col-4" style={{ height: "13rem", padding: "0" }}>
            <img
              src={
                props.image.includes("http")
                  ? props.image
                  : `/images/events/${props.image}`
              }
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              alt="..."
            />
          </div>

          <div className="col-6 card-body-right" style={{ padding: "1rem" }}>
            <h5 className="card-title">
              {props.isCanceled && "CANCELED"} {props.title} ({props.type}) -{" "}
              {props.points}
            </h5>

            <p className="card-text">
              {props.isCanceled
                ? `Cancelation reason: ${props.reason}`
                : props.description}
            </p>

            <a href="#" className="btn btn-primary me-2" onClick={joinHandler}>
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
              })}
              {""}
              at {props.location}
            </h6>
          </div>
        </div>
      </div>
    </>
  );
}
