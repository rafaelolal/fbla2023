import { Dispatch, SetStateAction } from "react";
import { Modal } from "react-bootstrap";
import { AdminAnnouncementType } from "../types/adminAnnouncements";

export default function AdminAnnouncementModal(props: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setDismissed: Dispatch<SetStateAction<boolean>>;
  announcements: AdminAnnouncementType[];
}) {
  return (
    <Modal centered show={props.show} onHide={() => props.setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Announcements</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {props.announcements.map((a) => (
          <>
            <p>{a.title}</p>
            <p>{a.content}</p>
            <p>{a.createdOn}</p>
            <p>{a.expiresOn}</p>
          </>
        ))}
      </Modal.Body>

      <Modal.Footer>
        <button
          className="btn btn-primary me-2"
          onClick={() => props.setShow(false)}
        >
          Close
        </button>

        <button
          className="btn btn-primary me-2"
          onClick={() => {
            props.setDismissed(true);
            props.setShow(false);
          }}
        >
          Dismiss
        </button>
      </Modal.Footer>
    </Modal>
  );
}
