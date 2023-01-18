import { MutableRefObject, SyntheticEvent, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useAppContext } from "../../context/state";
import { tempAuth } from "../../firebaseConfig";
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";

export default function PasswordModal(props: {
  firstTime: boolean;
  show: boolean;
  toggleModal: () => void;
}) {
  const { user, addToast } = useAppContext();

  const currentPasswordRef = useRef() as MutableRefObject<HTMLInputElement>;
  const newPasswordRef = useRef() as MutableRefObject<HTMLInputElement>;
  const newPasswordConfirmRef = useRef() as MutableRefObject<HTMLInputElement>;

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    signInWithEmailAndPassword(
      tempAuth,
      user!.email,
      currentPasswordRef.current.value
    )
      .then((userCredential) => {
        if (
          newPasswordRef.current.value != newPasswordConfirmRef.current.value
        ) {
          console.log("New passwords do not match");
          return;
        }

        const tempUser = userCredential.user;
        updatePassword(tempUser, newPasswordRef.current.value)
          .then(() => {
            console.log("New password set");
          })
          .catch((error) => {
            console.log("Could not set new password", { error });
          });
      })
      .catch(function (error) {
        console.log("Current password is incorrect", { error });
      });
  }

  return (
    <Modal show={props.show} onHide={props.toggleModal} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Update Password</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="firstNameInput" className="form-label">
              Current Password
            </label>
            <input
              type="text"
              className="form-control"
              id="firstNameInput"
              placeholder="John"
              required
              ref={currentPasswordRef}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="middleNameInput" className="form-label">
              New Password
            </label>
            <input
              type="text"
              className="form-control"
              id="middleNameInput"
              placeholder="New Current"
              required
              ref={newPasswordRef}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="middleNameInput" className="form-label">
              Confirm New Password
            </label>
            <input
              type="text"
              className="form-control"
              id="middleNameInput"
              placeholder="Confirm"
              required
              ref={newPasswordConfirmRef}
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          {!props.firstTime && (
            <button
              className="btn btn-primary me-2"
              onClick={props.toggleModal}
              type="button"
            >
              Cancel
            </button>
          )}

          <button className="btn btn-primary me-2" type="submit">
            Save Changes
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
