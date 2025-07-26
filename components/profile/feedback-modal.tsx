import { Dispatch, MutableRefObject, SetStateAction, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { gql } from "@apollo/client";
import client from "../../api/apollo-client";

export default function FeedbackModal(props: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  feedbackEventId: number;
  studentId: string;
}) {
  const ratingRef = useRef() as MutableRefObject<HTMLInputElement>;
  const contentRef = useRef() as MutableRefObject<HTMLTextAreaElement>;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    client
      .mutate({
        mutation: gql`
          mutation createEventFeedback(
            $input: CreateEventFeedbackMutationInput!
          ) {
            createEventFeedback(input: $input) {
              id
              event
              student
              content
              rating
            }
          }
        `,
        variables: {
          input: {
            event: props.feedbackEventId.toString(),
            student: props.studentId,
            rating: parseInt(ratingRef.current.value),
            content: contentRef.current.value,
          },
        },
      })
      .then(() => {
        props.setShow(false);
        ratingRef.current.value = "";
        contentRef.current.value = "";
        toast.success("Feedback sent successfully");
      })
      .catch((e) => {
        throw e;
      });
  }

  return (
    <Modal
      show={props.show}
      onHide={() => props.setShow(false)}
      centered
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title>Feedback</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="ratingInput" className="form-label">
              Rating
            </label>
            <input
              type="number"
              className="form-control"
              id="ratingInput"
              required
              ref={ratingRef}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="descriptionInput" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="descriptionInput"
              required
              ref={contentRef}
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button
            className="btn btn-primary me-2"
            onClick={() => props.setShow(false)}
            type="button"
          >
            Cancel
          </button>

          <button className="btn btn-primary me-2" type="submit">
            Send
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
