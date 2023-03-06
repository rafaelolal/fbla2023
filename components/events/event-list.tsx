import Event from "./event";
import { EventType } from "../../types/events";
import { KeyedMutator } from "swr";

export default function EventList(props: {
  events: EventType[];
  attendancesData: { pk: number; event: number }[];
  attendancesMutate: KeyedMutator<any>;
}) {
  let attendedEvents: number[] = [];
  if (props.attendancesData) {
    attendedEvents = props.attendancesData.map((o) => o.event);
  }

  function getAttendancePk(eventPk: number) {
    if (attendedEvents.includes(eventPk)) {
      return props.attendancesData.find((o) => {
        return o.event == eventPk;
      })?.pk;
    }
    return undefined;
  }

  return (
    <div className="col-10 mx-auto" style={{ maxWidth: "900px" }}>
      {props.events.map((event, i) => (
        <Event
          key={i}
          pk={event.pk}
          image={event.image}
          title={event.title}
          type={event.type}
          points={event.points}
          location={event.location}
          description={event.description}
          startsOn={event.startsOn}
          finishesOn={event.finishesOn}
          cancelationReason={event.cancelationReason}
          joined={attendedEvents.includes(event.pk)}
          attendancePk={getAttendancePk(event.pk)}
          attendancesMutate={props.attendancesMutate}
        />
      ))}
    </div>
  );
}
