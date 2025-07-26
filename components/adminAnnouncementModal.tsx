import { Dispatch, Fragment, SetStateAction } from "react";
import { Modal } from "react-bootstrap";
import { AdminAnnouncementType } from "../types/adminAnnouncement";

export default function AdminAnnouncementModal(props: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setDismissed: Dispatch<SetStateAction<boolean>>;
  announcements: AdminAnnouncementType[];
}) {
  return (
    <Modal centered show={props.show} onHide={() => props.setShow(false)}>
      <Modal.Header closeButton>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="#FF3131"
          className="bi bi-exclamation-diamond-fill"
          viewBox="0 0 16 16"
        >
          <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
        <Modal.Title className="ms-3">Announcements</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {props.announcements.map((a, i) => (
          <Fragment key={i}>
            <p className="mt-1 text-center fw-bold">{a.title}</p>
            <p className="text-center">{a.content}</p>
            <div className="row text-center">
              <div className="col p-0">
                <small className="d-block fw-semibold">Created On:</small>
                <small>{a.createdOn}</small>
              </div>
              <div className="col p-0">
                <small className="d-block fw-semibold">Expires On:</small>
                <small>{a.expiresOn}</small>
              </div>
            </div>
            <hr
              className="my-4 bg-tertiary"
              style={{ border: "none", height: "2px" }}
            />
          </Fragment>
        ))}

        <h6
          className="w-100 text-center text-tertiary"
          style={{ fontSize: "0.8rem" }}
        >
          Contact the School for More Information
        </h6>
      </Modal.Body>

      <Modal.Footer>
        <button
          className="btn eventBtn me-2"
          onClick={() => props.setShow(false)}
        >
          Close
        </button>

        <button
          className="btn eventBtn me-2"
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
