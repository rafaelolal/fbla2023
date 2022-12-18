import Event from "./event";
import { EventType } from "./types";

export default function EventList(props: {
  events: EventType[];
  page: string;
}) {
  return (
    <div className="row">
      {props.events.map((event, i) => (
        <Event
          key={i}
          id={event.id}
          image={event.image}
          name={event.name}
          type={event.type}
          points={event.points}
          location={event.location}
          description={event.description}
          datetime={event.datetime}
          page={props.page}
        />
      ))}
      ;
    </div>
  );
}
