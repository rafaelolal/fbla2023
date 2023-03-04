import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { ParticipantType } from "../../../types/events";

export default function AttendanceModal(props: {
  pk: number;
  show: boolean;
  toggleModal: () => void;
  participants: ParticipantType[];
}) {
  async function handleAttendance() {
    const checks = document.querySelectorAll(
      "input[type='checkbox']"
    ) as NodeListOf<HTMLInputElement>;

    const requests = [];
    for (const check of checks) {
      requests.push(
        axios.patch(
          `http://127.0.0.1:8000/api/attendance/${check.value}/update/`,
          {
            attended: check.checked,
          }
        )
      );
    }

    Promise.all(requests)
      .then(() => {
        toast.success("Attendance marked successfully");
        props.toggleModal();
      })
      .catch((error) => {
        toast.error(`/attendance/ /update/ (${error.code}): ${error.message}`);
        throw error;
      });
  }

  return (
    <Modal show={props.show} onHide={props.toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Attendance</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {props.participants.length == 0 ? (
          <p>No participants</p>
        ) : (
          props.participants.map((o, i) => (
            <div key={i} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={o.pk}
                id={`check-${props.pk}-${o.student}`}
                defaultChecked={o.attended}
              />

              <label
                className="form-check-label"
                htmlFor={`check-${props.pk}-${o.student}`}
              >
                {o.studentName}
              </label>
            </div>
          ))
        )}
      </Modal.Body>

      <Modal.Footer>
        <button className="btn btn-primary me-2" onClick={props.toggleModal}>
          Close
        </button>

        <button className="btn btn-primary me-2" onClick={handleAttendance}>
          Save Changes
        </button>
      </Modal.Footer>
    </Modal>
  );
}
