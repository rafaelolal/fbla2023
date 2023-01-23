import { MutableRefObject, SyntheticEvent, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { useAppContext } from "../../context/state";
import { addPathToFile } from "../../helpers";
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
  const uploadedImageRef = useRef("default.jpg");

  const firstNameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const middleNameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const lastNameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const gradeRef = useRef() as MutableRefObject<HTMLInputElement>;
  const bioRef = useRef() as MutableRefObject<HTMLTextAreaElement>;

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    await axios
      .post("/api/updateStudent", {
        id: props.data.id,
        firstName: firstNameRef.current.value,
        middleName: middleNameRef.current.value,
        lastName: lastNameRef.current.value,
        grade: +gradeRef.current.value,
        bio: bioRef.current.value,
        image: uploadedImageRef.current,
      })
      .then(function (response) {
        toast.success(`${response.data.title}: ${response.data.message}`);
        refreshData();
      })
      .catch(function (error) {
        toast.error(
          `Axios Add UpdateStudent Error (${error.code}): ${error.message}`
        );
      });
  }

  async function handleUpload() {
    setUploading(true);

    if (!selectedFile) return;

    const newFile = addPathToFile(selectedFile, "/profiles");

    const formData = new FormData();
    formData.append("myImage", newFile);

    axios
      .post("/api/addImage", formData)
      .then(function (data) {
        uploadedImageRef.current = data.data.image;
      })
      .catch(function (error) {
        toast.error(`addImage (${error.code}): ${error.message}`);
      });

    setUploading(false);
  }

  return (
    <Modal show={props.show} onHide={props.toggleModal} backdrop="static">
      <Modal.Header closeButton>
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
              placeholder="9"
              defaultValue={props.data.grade}
              required
              ref={gradeRef}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="bioInput" className="form-label">
              Biography
            </label>
            <textarea
              className="form-control"
              id="bioInput"
              defaultValue={props.data.bio}
              ref={bioRef}
            />
          </div>

          <div className="col-6">
            <label>
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
                  <img src={selectedImage} alt="" />
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
