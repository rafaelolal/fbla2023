import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { KeyedMutator } from "swr";
import { MutableRefObject, useRef } from "react";

export default function CancelingModal(props: {
  mutate: KeyedMutator<any>;
  setShowCancelingModal: Dispatch<SetStateAction<boolean>>;
  canceling: number;
  showCancelingModal: boolean;
}) {
  const cancelingRef = useRef() as MutableRefObject<HTMLTextAreaElement>;

  function handleCancel(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    axios
      .patch(`http://127.0.0.1:8000/api/event/${props.canceling}/cancel/`, {
        cancelationReason: cancelingRef.current.value,
      })
      .then(() => {
        props.mutate();
        props.setShowCancelingModal(false);
        toast.success("Canceled event successfully");
      })
      .catch((error) => {
        toast.error(
          `/event/${props.canceling}/cancel/ (${error.code}): ${error.message}`
        );
        throw error;
      });
  }

  return (
    <Modal
      show={props.showCancelingModal}
      onHide={() => props.setShowCancelingModal(false)}
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Cancel Event</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleCancel}>
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
              props.setShowCancelingModal(false);
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
  );
}
