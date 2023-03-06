import { MutableRefObject, useRef, Dispatch, SetStateAction } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  User,
} from "firebase/auth";
import { tempAuth } from "../../../firebaseConfig";
import { KeyedMutator } from "swr";
import { Modal } from "react-bootstrap";

export default function StudentCreateModal(props: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  mutate: KeyedMutator<any>;
}) {
  const emailRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    createUserWithEmailAndPassword(tempAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        axios
          .post("http://127.0.0.1:8000/api/student/create/", {
            id: user.uid,
            email: user.email,
          })
          .then(() => {
            tempAuth.signOut();
            props.mutate();
            props.setShow(false);
            toast.success("Student created successfully");
          })
          .catch((error) => {
            deleteUser(tempAuth.currentUser as User);
            toast.success(`student/create/ (${error.code}): ${error.message}`);
          });
      })
      .catch((error) => {
        toast.success(
          `"Firebase add student (${error.code}): ${error.message}`
        );
      });
  }

  return (
    <Modal
      show={props.show}
      onHide={() => props.setShow(false)}
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Create Event</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">
              Student email
            </label>
            <input
              type="email"
              className="form-control"
              id="emailInput"
              required
              ref={emailRef}
              onChange={() => {
                const eI = document.getElementById(
                  "emailInput"
                ) as HTMLInputElement;
                (
                  document.getElementById("passwordInput") as HTMLInputElement
                ).value =
                  eI.value.split("@")[0] +
                  "0".repeat(Math.max(0, 6 - eI.value.split("@")[0].length));
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="passwordInput" className="form-label">
              Default password
            </label>
            <input
              type="text"
              className="form-control"
              id="passwordInput"
              ref={passwordRef}
              disabled
              readOnly
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button
            className="btn btn-primary me-2"
            onClick={() => {
              props.setShow(false);
            }}
            type="button"
          >
            Cancel
          </button>

          <button className="btn btn-primary me-2" type="submit">
            Create
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
