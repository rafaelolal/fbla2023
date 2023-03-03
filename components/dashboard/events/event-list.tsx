import { KeyedMutator } from "swr";
import DashboardEvent from "./event";
import { DashboardEventType } from "../../../types/events";
import { MutableRefObject, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";

export default function DashboardEventList(props: {
  mutate: KeyedMutator<any>;
  events: DashboardEventType[];
}) {
  const cancelingRef = useRef() as MutableRefObject<HTMLTextAreaElement>;

  const [canceling, setCanceling] = useState<number>();
  const [showCancellingModal, setShowCancellingModal] = useState(false);

  function cancelHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    axios
      .patch(`http://127.0.0.1:8000/api/event/${canceling}/cancel/`, {
        cancellationReason: cancelingRef.current.value,
      })
      .then(function (response) {
        if (response.status == 200) {
          toast.success("Canceled event successfully");
          props.mutate();
        }
      })
      .catch(function (error) {
        toast.error(
          `event/${canceling}/cancel/ (${error.code}): ${error.message}`
        );
      });
  }

  return (
    <>
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
            setCanceling={setCanceling}
            setShowCancellingModal={setShowCancellingModal}
          />
        ))}
      </div>
      <Modal
        show={showCancellingModal}
        onHide={() => setShowCancellingModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Cancel Event</Modal.Title>
        </Modal.Header>

        <form onSubmit={cancelHandler}>
          <Modal.Body>
            <>
              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Reason for cancelation"
                  id="floatingTextarea"
                  ref={cancelingRef}
                ></textarea>
                <label htmlFor="floatingTextarea">Reason</label>
              </div>
            </>
          </Modal.Body>

          <Modal.Footer>
            <button
              className="btn btn-primary me-2"
              onClick={() => {
                setShowCancellingModal(false);
              }}
              type="button"
            >
              Cancel
            </button>

            <button className="btn btn-primary me-2" type="submit">
              Save Changes
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
