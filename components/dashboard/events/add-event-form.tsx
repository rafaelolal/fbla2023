import { MutableRefObject, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { KeyedMutator } from "swr";

export default function AddEventForm(props: { mutate: KeyedMutator<any> }) {
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

  async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setUploading(true);

    if (!selectedFile) return;

    await axios
      .post("http://127.0.0.1:8000/api/event/create/", {
        startsOn: new Date(`${startsOnRef.current.value}+00:00`),
        finishesOn: new Date(`${endsOnRef.current.value}+00:00`),
        description: descriptionRef.current.value,
        image: "https://picsum.photos/seed/00000/300", // use this default until actually using files
        location: locationRef.current.value,
        title: titleRef.current.value,
        points: parseInt(pointsRef.current.value),
        type: typeRef.current.value,
      })
      .then(function (response) {
        toast.success("Event created successfully");
        props.mutate();
      })
      .catch(function (error) {
        toast.error(`createEvent (${error.code}): ${error.message}`);
      });

    setUploading(false);
  }

  return (
    <div className="h-100 flex-column align-items-stretch mt-4">
      <form onSubmit={handleUpload}>
        <div className="row">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            required
            ref={titleRef}
          />
        </div>
        <div className="row">
          <div className="col-6">
            <div className="mt-3 fs-6 fw-semibold">Start Time</div>
            <input
              type="datetime-local"
              className="form-control mb-1"
              required
              ref={startsOnRef}
            />
          </div>

          <div className="col-6">
            <div className="mt-3 fs-6 fw-semibold">End Time</div>
            <input
              type="datetime-local"
              className="form-control mb-1"
              required
              ref={endsOnRef}
            />
          </div>
        </div>

        <div className="row mt-4">
          <textarea
            className="form-control my-2"
            placeholder="Description"
            required
            ref={descriptionRef}
          />
        </div>
        <div className="col-12 mx-auto my-2">
          <input
            type="text"
            className="form-control d-inline-block mx-1"
            style={{ width: "30%" }}
            placeholder="Location"
            required
            ref={locationRef}
          />

          <input
            type="number"
            className="form-control d-inline-block mx-1"
            style={{ width: "30%" }}
            placeholder="Points"
            required
            ref={pointsRef}
          />

          <select
            className="form-select d-inline-block mx-1"
            style={{ width: "30%" }}
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

        <label className="mt-4">
          <input
            required
            type="file"
            onChange={({ target }) => {
              if (target.files) {
                const file = target.files[0];
                setSelectedImage(URL.createObjectURL(file));
                setSelectedFile(file);
              }
            }}
          />

          {selectedImage && (
            <img width="200px" height="auto" src={selectedImage} alt="" />
          )}

          <button
            style={{ opacity: uploading ? ".5" : "1" }}
            className={`btn eventBtn ${uploading ? "disabled" : ""}`}
            type="submit"
          >
            {uploading ? "Uploading.." : "Upload"}
          </button>
        </label>
      </form>
    </div>
  );
}
