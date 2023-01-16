import { KeyedMutator } from "swr";
import DashboardEvent from "./event";
import { DashBoardEventPropsType } from "../../../types/events";

export default function DashboardEventList(props: {
  mutate: KeyedMutator<any>;
  events: DashBoardEventPropsType[];
}) {
  return (
    <div className="row">
      {props.events.map((event, i) => (
        <DashboardEvent
          key={i}
          id={event.id}
          name={event.name}
          datetime={event.datetime}
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
