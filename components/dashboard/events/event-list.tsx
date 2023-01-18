import { KeyedMutator } from "swr";
import DashboardEvent from "./event";
import { DashboardEventType } from "../../../types/events";

export default function DashboardEventList(props: {
  mutate: KeyedMutator<any>;
  events: DashboardEventType[];
}) {
  return (
    <div className="row">
      {props.events.map((event, i) => (
        <DashboardEvent
          key={i}
          id={event.id}
          title={event.title}
          start={event.start}
          participants={event.participants}
          isCanceled={event.isCanceled}
          reason={event.reason}
          mutate={props.mutate}
        />
      ))}
      ;
    </div>
  );
}
