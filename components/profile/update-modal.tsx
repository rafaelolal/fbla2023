import { MutableRefObject, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { ProfileModalStudentType } from "../../types/students";
import { toast } from "react-toastify";

export default function UpdateModal(props: {
  data: ProfileModalStudentType;
  firstTime: boolean;
  show: boolean;
  toggleModal: () => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const uploadedImageRef = useRef(
    "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
  ); // use this default until actually using files

  const firstNameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const middleNameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const lastNameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const gradeRef = useRef() as MutableRefObject<HTMLInputElement>;
  const biographyRef = useRef() as MutableRefObject<HTMLTextAreaElement>;

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await axios
      .patch(`http://127.0.0.1:8000/api/student/${props.data.pk}/update/`, {
        firstName: firstNameRef.current.value,
        middleName: middleNameRef.current.value,
        lastName: lastNameRef.current.value,
        grade: +gradeRef.current.value,
        biography: biographyRef.current.value,
        image: uploadedImageRef.current,
      })
      .then(function (response) {
        toast.success(`Successfully updated profile`);
        refreshData();
      })
      .catch(function (error) {
        toast.error(
          `student/${props.data.pk}/update/ (${error.code}): ${error.message}`
        );
      });
  }

  async function handleUpload() {
    setUploading(true);

    if (!selectedFile) return;
    uploadedImageRef.current = "https://picsum.photos/seed/00001/300"; // use this default until actually using files

    setUploading(false);
  }

  return (
    <Modal
      show={props.show}
      onHide={props.toggleModal}
      centered
      backdrop="static"
    >
      <Modal.Header closeButton={!props.firstTime}>
        <Modal.Title>Update Profile</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="firstNameInput" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstNameInput"
              placeholder="John"
              defaultValue={props.data.firstName}
              required
              ref={firstNameRef}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="middleNameInput" className="form-label">
              Middle Name
            </label>
            <input
              type="text"
              className="form-control"
              id="middleNameInput"
              placeholder="Michael"
              defaultValue={props.data.middleName}
              required
              ref={middleNameRef}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lastNameInput" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastNameInput"
              placeholder="Doe"
              defaultValue={props.data.lastName}
              required
              ref={lastNameRef}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="gradeInput" className="form-label">
              Grade
            </label>
            <input
              type="number"
              className="form-control"
              id="gradeInput"
              placeholder="5"
              defaultValue={props.data.grade}
              required
              ref={gradeRef}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="biographyInput" className="form-label">
              Biography
            </label>
            <textarea
              className="form-control"
              id="biographyInput"
              defaultValue={props.data.biography}
              ref={biographyRef}
            />
          </div>

          <div className="col-12">
            <label className="w-100">
              <input
                type="file"
                onChange={({ target }) => {
                  if (target.files) {
                    const file = target.files[0];
                    setSelectedImage(URL.createObjectURL(file));
                    setSelectedFile(file);
                  }
                }}
              />
              <div>
                {selectedImage ? (
                  <img className="my-2 w-100" src={selectedImage} alt="" />
                ) : (
                  <span>Select Image</span>
                )}
              </div>
            </label>
            <button
              onClick={handleUpload}
              style={{ opacity: uploading ? ".5" : "1" }}
              className={`btn btn-primary ${uploading ? "disabled" : ""}`}
              type="button"
            >
              {uploading ? "Uploading.." : "Upload"}
            </button>
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
