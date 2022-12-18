import axios from "axios";
import { useAppContext } from "../../context/state";
import { EventPropType } from "./types";

export default function Event(props: EventPropType) {
  const { user, addToast } = useAppContext();
  const now = new Date();

  async function joinHandler() {
    if (!user) {
      addToast({
        status: 403,
        title: "Sign Im",
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

    console.log({ studentEvent: result });
  }

  return (
    <div className="col">
      <div className="card" style={{ width: "18rem" }}>
        <img src={props.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">
            {props.name} ({props.type}) - {props.points}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {new Date(props.datetime).toLocaleString(undefined, {
              timeZone: "UTC",
              year: "numeric",
              month: "long",
              day: "2-digit",
              weekday: "long",
            })}{" "}
            at {props.location}
          </h6>
          <p className="card-text">{props.description}</p>

          {props.page == "dashboard" && (
            <>
              <a
                href="#"
                className={`btn btn-primary me-2 ${
                  new Date(props.datetime) < now ? "disabled" : ""
                }`}
              >
                Cancel
              </a>
              <a
                href="#"
                className={`btn btn-primary me-2 ${
                  new Date(props.datetime) > now ? "disabled" : ""
                }`}
              >
                Mark Attendance
              </a>
            </>
          )}

          {props.page == "events" && (
            <a href="#" className="btn btn-primary me-2" onClick={joinHandler}>
              Join
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
