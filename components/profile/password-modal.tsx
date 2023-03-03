import { MutableRefObject, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/state";
import { tempAuth } from "../../firebaseConfig";
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { useRouter } from "next/router";

export default function PasswordModal(props: {
  firstTime: boolean;
  show: boolean;
  toggleModal: () => void;
}) {
  const { user } = useAppContext();

  const router = useRouter();
  const currentPasswordRef = useRef() as MutableRefObject<HTMLInputElement>;
  const newPasswordRef = useRef() as MutableRefObject<HTMLInputElement>;
  const newPasswordConfirmRef = useRef() as MutableRefObject<HTMLInputElement>;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    signInWithEmailAndPassword(
      tempAuth,
      user!.email as string,
      currentPasswordRef.current.value
    )
      .then((userCredential) => {
        if (
          newPasswordRef.current.value != newPasswordConfirmRef.current.value
        ) {
          toast.warning("New passwords do not match");
          return;
        }

        const tempUser = userCredential.user;
        updatePassword(tempUser, newPasswordRef.current.value)
          .then(() => {
            toast.success("New password set");
            props.toggleModal();
            if (props.firstTime) {
              router.replace(router.asPath);
            }
          })
          .catch((error) => {
            toast.error(
              `Could not set new password (${error.code}): ${error.message}`
            );
          });
      })
      .catch(function (error) {
        toast.warning(
          `Current password is incorrect (${error.code}): ${error.message}`
        );
      });
  }

  return (
    <Modal
      show={props.show}
      onHide={props.toggleModal}
      centered
      backdrop="static"
    >
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
              type="password"
              className="form-control"
              id="firstNameInput"
              placeholder="Current Password"
              required
              ref={currentPasswordRef}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="middleNameInput" className="form-label">
              New Password
            </label>
            <input
              type="password"
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
              type="password"
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
