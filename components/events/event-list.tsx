import Event from "./event";
import { EventType } from "../../types/events";

export default function EventList(props: { events: EventType[] }) {
  return (
    <div className="row row-cols-1 justify-content-center">
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
          start={event.start}
          isCanceled={event.isCanceled}
          reason={event.reason}
        />
      ))}
      ;
    </div>
  );
}
