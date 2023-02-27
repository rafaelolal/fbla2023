import { MutableRefObject, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddNewsForm() {
  const dateRef = useRef() as MutableRefObject<HTMLInputElement>;
  const descriptionRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const nameRef = useRef() as MutableRefObject<HTMLInputElement>;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    axios
      .post("/api/addNews", {
        datetime: new Date(`${dateRef.current.value}`),
        description: descriptionRef.current.value,
        name: nameRef.current.value,
      })
      .then(function (response) {
        toast.success(response.data.message);
      })
      .catch(function (error) {
        toast.error(`addNews (${error.code}): ${error.message}`);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-12 col-md-6 my-2">
          <input type="date" className="form-control" required ref={dateRef} />
        </div>

        <div className="col-12 col-md-6 my-2">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            required
            ref={nameRef}
          />
        </div>

        <div className="col-12 my-2">
          <textarea
            className="form-control"
            placeholder="Description"
            required
            ref={descriptionRef}
          />
        </div>
      </div>
      <button
        className="btn eventBtn my-3"
        style={{ width: "100px" }}
        type="submit"
      >
        Add
      </button>
    </form>
  );
}
