import { MutableRefObject, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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

    const data = await axios
      .post("/api/addImage", formData)
      .catch(function (error) {
        toast.error(`addImage (${error.code}): ${error.message}`);
        return;
      });

    await axios
      .post("/api/addEvent", {
        start: new Date(
          `${startDateRef.current.value}T${startTimeRef.current.value}`
        ),
        end: new Date(
          `${endDateRef.current.value}T${endTimeRef.current.value}`
        ),
        description: descriptionRef.current.value,
        image: data!.data.image,
        location: locationRef.current.value,
        title: titleRef.current.value,
        points: parseInt(pointsRef.current.value),
        type: typeRef.current.value,
      })
      .then(function (response) {
        toast.success(response.data.message);
      })
      .catch(function (error) {
        toast.error(`addEvent (${error.code}): ${error.message}`);
      });

    setUploading(false);
  }

  return (
    <>
      <div className="h-100 flex-column align-items-stretch mt-4">
        <div className="row">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            ref={titleRef}
          />
        </div>
        <div className="row">
          <div className="col-6">
            <div className="mt-3 fs-6">Start</div>
            <input
              type="date"
              className="form-control"
              required
              ref={startDateRef}
            />
            <input type="time" required ref={startTimeRef} />
          </div>

          <div className="col-6">
            <div className="mt-3 fs-6">End</div>
            <input
              type="date"
              className="form-control"
              required
              ref={endDateRef}
            />
            <input type="time" required ref={endTimeRef} />
          </div>
        </div>

        <div className="row mt-4">
          <textarea
            className="form-control my-2"
            placeholder="Description"
            ref={descriptionRef}
          />

          <input
            type="text"
            className="form-control w-50"
            placeholder="Location"
            ref={locationRef}
          />

          <input
            type="number"
            className="form-control w-50"
            placeholder="Points"
            ref={pointsRef}
          />
        </div>

        <div className="col-6 mx-auto my-2">
          <select className="form-select" ref={typeRef}>
            <option value="Type">Type</option>
            <option value="Sports">Sports</option>
            <option value="Social">Social</option>
            <option value="Band">Band</option>
            <option value="Academic">Academic</option>
          </select>
        </div>

        <label className="mt-4">
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

          {selectedImage ? (
            <img src={selectedImage} alt="" />
          ) : (
            <span>Select Image </span>
          )}

          <button
            onClick={handleUpload}
            style={{ opacity: uploading ? ".5" : "1" }}
            className={`btn eventBtn ${uploading ? "disabled" : ""}`}
          >
            {uploading ? "Uploading.." : "Upload"}
          </button>
        </label>
      </div>
    </>
  );
}
