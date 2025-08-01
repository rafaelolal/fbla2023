import Event from "./event";
import { EventType } from "../../types/event";
import { KeyedMutator } from "swr";

export default function EventList(props: {
  events: EventType[];
  attendancesData: { id: number; event: number }[];
  attendancesMutate: KeyedMutator<any>;
}) {
  let attendedEvents: number[] = [];
  if (props.attendancesData) {
    attendedEvents = props.attendancesData.map((o) => o.event);
  }

  function getAttendanceId(eventId: number) {
    if (attendedEvents.includes(eventId)) {
      return props.attendancesData.find((o) => {
        return o.event == eventId;
      })?.id;
    }
    return undefined;
  }

  return (
    <div>
      <div className="d-flex" style={{ height: "73px" }}>
        <h5 className="ms-4 mt-auto mb-0 text-quaternary">
          Displaying{" "}
          <span className="text-tertiary">{props.events.length}</span> Events
          <hr
            className="mt-1 mb-0 bg-tertiary"
            style={{ border: "none", height: "3px", width: "30%" }}
          ></hr>
        </h5>
      </div>
      {props.events.map((event, i) => (
        <Event
          key={i}
          id={event.id}
          image={event.image}
          title={event.title}
          type={event.type}
          points={event.points}
          location={event.location}
          description={event.description}
          startsOn={event.startsOn}
          finishesOn={event.finishesOn}
          cancelationReason={event.cancelationReason}
          joined={attendedEvents.includes(event.id)}
          attendanceId={getAttendanceId(event.id)}
          attendancesMutate={props.attendancesMutate}
        />
      ))}
    </div>
  );
}
