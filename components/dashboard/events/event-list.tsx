import { KeyedMutator } from "swr";
import DashboardEvent from "./event";
import { DashboardEventType } from "../../../types/events";

export default function DashboardEventList(props: {
  mutate: KeyedMutator<any>;
  events: DashboardEventType[];
}) {
  return (
    <div className="container">
      <div className="row justify-content-around py-3 px-5 border-bottom border-top bg-primary">
        <div className="col-3 d-flex border-end">
          <h5 className="my-auto">Event Name</h5>
        </div>
        <div className="col-5 d-flex border-end">
          <h5 className="m-auto">Description</h5>
        </div>
        <div className="col-4 d-flex">
          <h5 className="m-auto">Actions</h5>
        </div>
      </div>
      {props.events.map((event, i) => (
        <DashboardEvent
          key={i}
          pk={event.pk}
          title={event.title}
          startsOn={event.startsOn}
          finishesOn={event.finishesOn}
          participants={event.participants}
          cancellationReason={event.cancellationReason}
          mutate={props.mutate}
        />
      ))}
    </div>
  );
}
