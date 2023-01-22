import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { ParticipantsType } from "../../../types/events";

export default function AttendanceModal(props: {
  id: number;
  show: boolean;
  toggleModal: () => void;
  participants: ParticipantsType;
}) {
  async function markAttendanceHandler() {
    const checks = document.querySelectorAll(
      'input[type="checkbox"]'
    ) as NodeListOf<HTMLInputElement>;

    var attendance = [];
    for (let check of checks) {
      attendance.push({ id: check.value, attended: check.checked });
    }

    const result = await axios
      .post("/api/markAttendance", {
        attendance,
        eventId: props.id,
      })
      .then(function (response) {
        toast.success(`${response.data.title}: ${response.data.message}`);
      })
      .catch(function (error) {
        toast.error(`${error.code}: ${error.message}`);
      });

    props.toggleModal();
  }

  return (
    <Modal show={props.show} onHide={props.toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {props.participants.length == 0 ? (
          <p>No participants</p>
        ) : (
          props.participants.map((comb, i) => (
            <div key={i} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={comb.studentId}
                id={`check-${props.id}-${comb.studentId}`}
                defaultChecked={comb.attended}
              />
              <label
                className="form-check-label"
                htmlFor={`check-${comb.studentId}`}
              >
                {comb.studentName}
              </label>
            </div>
          ))
        )}
      </Modal.Body>

      <Modal.Footer>
        <button className="btn btn-primary me-2" onClick={props.toggleModal}>
          Close
        </button>
        <button
          className="btn btn-primary me-2"
          onClick={markAttendanceHandler}
        >
          Save Changes
        </button>
      </Modal.Footer>
    </Modal>
  );
}
