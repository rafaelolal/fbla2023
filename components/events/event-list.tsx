import Event from "./event";
import { EventType } from "../../types/events";
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
