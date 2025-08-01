import {
  MutableRefObject,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { KeyedMutator } from "swr";
import { Modal } from "react-bootstrap";

export default function CreateModal(props: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  mutate: KeyedMutator<any>;
}) {
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();

  const startsOnRef = useRef() as MutableRefObject<HTMLInputElement>;
  const endsOnRef = useRef() as MutableRefObject<HTMLInputElement>;
  const descriptionRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const locationRef = useRef() as MutableRefObject<HTMLInputElement>;
  const titleRef = useRef() as MutableRefObject<HTMLInputElement>;
  const pointsRef = useRef() as MutableRefObject<HTMLInputElement>;
  const typeRef = useRef() as MutableRefObject<HTMLSelectElement>;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/event/create/", {
        startsOn: new Date(`${startsOnRef.current.value}+00:00`),
        finishesOn: new Date(`${endsOnRef.current.value}+00:00`),
        description: descriptionRef.current.value,
        image: selectedImage, // selectedFile
        location: locationRef.current.value,
        title: titleRef.current.value,
        points: parseInt(pointsRef.current.value),
        type: typeRef.current.value,
      })
      .then(function () {
        props.mutate();
        props.setShow(false);
        toast.success("Event created successfully");
      })
      .catch(function (error) {
        toast.error(`/event/create/ (${error.code}): ${error.message}`);
        throw error;
      });
  }

  function handleImageUpload() {
    setUploading(true);

    if (!selectedFile) return;

    setSelectedImage("https://picsum.photos/seed/00000/300");

    setUploading(false);
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
          <div className="container-fluid p-3">
            <div className="row">
              <div className="mb-1 fs-6 fw-semibold p-0">Title</div>
              <input
                type="text"
                className="form-control"
                required
                ref={titleRef}
              />
            </div>

            <div className="row">
              <div className="col-6 p-0 pe-2">
                <div className="mt-3 mb-1 fs-6 fw-semibold">Start Time</div>
                <input
                  type="datetime-local"
                  className="form-control mb-1"
                  required
                  ref={startsOnRef}
                />
              </div>

              <div className="col-6 p-0 ps-2">
                <div className="mt-3 mb-1 fs-6 fw-semibold">End Time</div>
                <input
                  type="datetime-local"
                  className="form-control mb-1"
                  required
                  ref={endsOnRef}
                />
              </div>
            </div>

            <div className="row">
              <div className="p-0 mt-3 mb-1 fs-6 fw-semibold">Description</div>
              <textarea
                className="form-control my-2"
                placeholder="This event is about..."
                required
                ref={descriptionRef}
              />
            </div>

            <div className="row justify-content-between">
              <div className="p-0 mt-3 mb-1 fs-6 fw-semibold">Attributes</div>
              <input
                type="text"
                className="form-control d-inline-block"
                style={{ width: "32%" }}
                placeholder="Location"
                required
                ref={locationRef}
              />

              <input
                type="number"
                className="form-control d-inline-block"
                style={{ width: "32%" }}
                placeholder="Points"
                required
                ref={pointsRef}
              />

              <select
                className="form-select d-inline-block"
                style={{ width: "32%" }}
                ref={typeRef}
                required
              >
                <option value="Type">Type</option>
                <option value="Competition">Competition</option>
                <option value="Show">Show</option>
                <option value="Fundraiser">Fundraiser</option>
                <option value="Trip">Trip</option>
                <option value="Fair">Fair</option>
              </select>
            </div>
          </div>

          <div className="row">
            <label>
              <div className="mt-3 mb-1 fs-6 fw-semibold p-0">
                Profile Image
              </div>
              <input
                required
                type="file"
                onChange={({ target }) => {
                  if (target.files) {
                    const file = target.files[0];
                    setSelectedImage(URL.createObjectURL(file));
                    setSelectedFile(file);
                    handleImageUpload();
                  }
                }}
              />

              {selectedImage && (
                <img width="200px" height="auto" src={selectedImage} alt="" />
              )}
            </label>
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
