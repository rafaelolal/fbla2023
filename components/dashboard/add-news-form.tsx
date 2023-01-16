import { MutableRefObject, useRef } from "react";
import axios from "axios";

export default function AddNewsForm() {
  const dateRef = useRef() as MutableRefObject<HTMLInputElement>;
  const descriptionRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const nameRef = useRef() as MutableRefObject<HTMLInputElement>;

  async function handleUpload() {
    axios
      .post("/api/addNews", {
        datetime: new Date(`${dateRef.current.value}`),
        description: descriptionRef.current.value,
        name: nameRef.current.value,
      })
      .then(function (response) {
        console.log({ addNewsResponse: response });
      })
      .catch(function (error) {
        console.log({ addNewsError: error });
      });
  }

  return (
    <>
      <div className="row">
        <div className="col-6">
          <input type="date" className="form-control" required ref={dateRef} />
        </div>

        <div className="col-6">
          <textarea
            className="form-control"
            placeholder="Description"
            ref={descriptionRef}
          />
        </div>

        <div className="col-6">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            ref={nameRef}
          />
        </div>
      </div>

      <button onClick={handleUpload} className="btn btn-primary">
        Add
      </button>
    </>
  );
}
