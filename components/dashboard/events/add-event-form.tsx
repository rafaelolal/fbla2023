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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    axios
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
      .then(function () {
        props.mutate();
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

    setUploading(false);
  }

  return (
    
    <div className="mt-4">
      <form onSubmit={handleSubmit}>
        <div className="col-12 my-4">
          <h6 className="fw-semibold p-0">Title</h6>
          <input
            type="text"
            className="form-control"
           
            required
            ref={titleRef}
          />
        </div>
        
          <div className="col-12 p-0 my-4">
            <div className="w-50 d-inline-block pe-2">
            <h6 className="fw-semibold">Start Time</h6>
            <input
              type="datetime-local"
              className="form-control"
              required
              ref={startsOnRef}
            />
        </div>

          <div className="w-50 d-inline-block ps-2">
            <h6 className="fw-semibold">End Time</h6>
            <input
              type="datetime-local"
              className="form-control"
              required
              ref={endsOnRef}
            />
            </div>
          </div>
       

        <div className="col-12 my-4">
          <h6 className="fw-semibold p-0">Description</h6>
          <textarea
            className="form-control "
            placeholder="The event is about..."
            required
            ref={descriptionRef}
          />
        </div>
        
       <h6 className="fw-semibold p-0 mt-4">Attributes</h6>
        <div className="col-12 d-flex mb-4">
         
          <div className="d-inline-flex">
            <input
              type="text"
              className="form-control"
              
              placeholder="Location"
              required
              ref={locationRef}
          />
          </div>
          <div className="d-inline-flex">
            <input
                        type="number"
                        className="form-control mx-2"
                        
                        placeholder="Points"
                        required
                        ref={pointsRef}
                      />
          </div>
          <div className=" d-inline-flex">
            <select
              className="form-select"
              
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

        <div className="col-12 my-4">

       <h6 className="fw-semibold p-0">Profile Image</h6>
        <label className="d-flex flex-column">
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
            <img className="mx-auto mt-4" width="70%" height="auto" src={selectedImage} alt="" />
          )}

        </label>
      </div>


      <div className="col-12 mt-4">
        <button
            className={`btn eventBtn ${uploading ? "disabled" : ""}`}
            type="submit"
          >
            {uploading ? "Uploading.." : "Save Event"}
          </button>
      </div>
      </form>
      
    </div>
  );
}
