import { MutableRefObject, useRef, useState } from "react";
import axios from "axios";

export default function AddEventForm() {
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();

  const startDateRef = useRef() as MutableRefObject<HTMLInputElement>;
  const startTimeRef = useRef() as MutableRefObject<HTMLInputElement>;
  const endDateRef = useRef() as MutableRefObject<HTMLInputElement>;
  const endTimeRef = useRef() as MutableRefObject<HTMLInputElement>;
  const descriptionRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const locationRef = useRef() as MutableRefObject<HTMLInputElement>;
  const titleRef = useRef() as MutableRefObject<HTMLInputElement>;
  const pointsRef = useRef() as MutableRefObject<HTMLInputElement>;
  const typeRef = useRef() as MutableRefObject<HTMLSelectElement>;

  async function handleUpload() {
    setUploading(true);
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("myImage", selectedFile);

    axios
      .post("/api/addImage", formData)
      .then(function (data) {
        axios
          .post("/api/addEvent", {
            start: new Date(
              `${startDateRef.current.value}T${startTimeRef.current.value}`
            ),
            end: new Date(
              `${endDateRef.current.value}T${endTimeRef.current.value}`
            ),
            description: descriptionRef.current.value,
            image: data.data.image,
            location: locationRef.current.value,
            title: titleRef.current.value,
            points: parseInt(pointsRef.current.value),
            type: typeRef.current.value,
          })
          .then(function (response) {
            console.log({ addEventResponse: response });
          })
          .catch(function (error) {
            console.log({ addEventError: error });
          });
      })
      .catch(function (error) {
        console.log({ apiImageError: error });
      });

    setUploading(false);
  }

  return (
    <>
      <div className="row">
        <div className="col-6">
          <p>Start</p>
          <input
            type="date"
            className="form-control"
            required
            ref={startDateRef}
          />
          <input type="time" required ref={startTimeRef} />

          <p>End</p>
          <input
            type="date"
            className="form-control"
            required
            ref={endDateRef}
          />
          <input type="time" required ref={endTimeRef} />
        </div>

        <div className="col-6">
          <textarea
            className="form-control"
            placeholder="Description"
            ref={descriptionRef}
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
          >
            {uploading ? "Uploading.." : "Upload"}
          </button>
        </div>

        <div className="col-6">
          <input
            type="text"
            className="form-control"
            placeholder="Location"
            ref={locationRef}
          />
        </div>

        <div className="col-6">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            ref={titleRef}
          />
        </div>

        <div className="col-6">
          <input
            type="number"
            className="form-control"
            placeholder="Points"
            ref={pointsRef}
          />
        </div>

        <div className="col-6">
          <select className="form-select" ref={typeRef}>
            <option value="Type">Type</option>
            <option value="Sports">Sports</option>
            <option value="Social">Social</option>
            <option value="Band">Band</option>
            <option value="Academic">Academic</option>
          </select>
        </div>
      </div>
    </>
  );
}
