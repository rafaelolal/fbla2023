import { KeyedMutator } from "swr";
import DashboardEvent from "./event";
import { DashboardEventType } from "../../../types/event";
import { useState } from "react";
import CancelingModal from "./canceling-modal";

export default function DashboardEventList(props: {
  mutate: KeyedMutator<any>;
  events: DashboardEventType[];
}) {
  const [canceling, setCanceling] = useState<number>();
  const [showCancelingModal, setShowCancelingModal] = useState(false);

  return (
    <>
      <CancelingModal
        mutate={props.mutate}
        canceling={canceling as number}
        setShowCancelingModal={setShowCancelingModal}
        showCancelingModal={showCancelingModal}
      />

      <div className="row justify-content-around py-3 px-3 border-bottom border-top bg-primary">
        <div className="col-3 d-flex border-end">
          <h5 className="m-auto">Event Name</h5>
        </div>

        <div className="col-3 d-flex border-end">
          <h5 className="m-auto">Starts On</h5>
        </div>

        <div className="col-3 d-flex border-end">
          <h5 className="m-auto">Finishes On</h5>
        </div>

        <div className="col-3 d-flex">
          <h5 className="m-auto">Actions</h5>
        </div>
      </div>

      {props.events.map((event, i) => (
        <DashboardEvent
          key={i}
          id={event.id}
          title={event.title}
          startsOn={event.startsOn}
          finishesOn={event.finishesOn}
          participants={event.participants}
          cancelationReason={event.cancelationReason}
          mutate={props.mutate}
          setCanceling={setCanceling}
          setShowCancelingModal={setShowCancelingModal}
        />
      ))}
    </>
  );
}
