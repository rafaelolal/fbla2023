import axios from "axios";
import { useAppContext } from "../../../context/state";
import Modal from "react-bootstrap/Modal";
import { ParticipantsType } from "../../../types/events";

export default function AttendanceModal(props: {
  id: number;
  show: boolean;
  toggleModal: () => void;
  participants: ParticipantsType;
}) {
  const { user, addToast } = useAppContext();

  async function markAttendanceHandler() {
    const checks = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    ) as NodeListOf<HTMLInputElement>;

    console.log({ checks });

    var studentIds = [];
    for (let check of checks) {
      studentIds.push(check.value);
    }

    console.log({ studentIds });

    const result = await axios
      .post("/api/markAttendance", {
        studentIds: studentIds,
        eventId: props.id,
      })
      .then(function (response) {
        addToast({
          status: response.data.status,
          title: response.data.title,
          body: `${response.data.message}`,
        });
      })
      .catch(function (error) {
        addToast({
          status: 500,
          title: "Axios Add StudentsOnEvents Error",
          body: `Error ${error.code}: ${error.message}`,
        });
      });

    console.log({ studentEventResult: result });
    props.toggleModal();
  }

  console.log({ part: props.participants });

  return (
    <Modal show={props.show} onHide={props.toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {props.participants.length == 0 ? (
          <p>No participants</p>
        ) : (
          props.participants.map((comb) => (
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={comb.studentId}
                id={`check-${props.id}-${comb.studentId}`}
              />
              <label
                className="form-check-label"
                htmlFor={`check-${comb.studentId}`}
              >
                {comb.studentId}
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
