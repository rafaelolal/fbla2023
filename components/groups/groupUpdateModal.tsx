import { Dispatch, MutableRefObject, SetStateAction, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

export default function GroupUpdateModal(props: {
  data: { id: number; name: string; description: string; isPrivate: boolean };
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}) {
  const nameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const descriptionRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const isPrivateRef = useRef() as MutableRefObject<HTMLInputElement>;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    //   event.preventDefault();
    //   await axios
    //     .patch(`http://127.0.0.1:8000/api/student/${props.data.id}/update/`, {
    //       firstName: nameRef.current.value,
    //       middleName: descriptionRef.current.value,
    //       lastName: isPrivateRef.current.value,
    //       grade: +gradeRef.current.value,
    //       biography: biographyRef.current.value,
    //       image: selectedImage, // selectedFile
    //     })
    //     .then(() => {
    //       if (props.firstTime) {
    //         props.toggleModal();
    //         props.togglePasswordModal();
    //       } else {
    //         router.replace(router.asPath);
    //       }
    //       toast.success("Successfully updated profile");
    //     })
    //     .catch((error) => {
    //       toast.error(
    //         `/student/${props.data.id}/update/ (${error.code}): ${error.message}`
    //       );
    //       throw error;
    //     });
  }

  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.setShow(false);
      }}
      centered
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title>Update Group</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="nameInput" className="form-label">
              Name
            </label>

            <input
              type="text"
              className="form-control"
              id="nameInput"
              placeholder="Group Name"
              defaultValue={props.data.name}
              required
              ref={nameRef}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="groupDescription" className="form-label">
              Description
            </label>

            <textarea
              className="form-control"
              id="groupDescription"
              placeholder="Group Description"
              defaultValue={props.data.description}
              required
              ref={descriptionRef}
            />
          </div>

          <div className="mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="privateCheckbox"
                value=""
                defaultChecked={props.data.isPrivate}
                ref={isPrivateRef}
              />

              <label className="form-check-label" htmlFor="privateCheckbox">
                Private
              </label>
            </div>
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
            Save Changes
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
