import { MutableRefObject, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddNewsForm() {
  const dateRef = useRef() as MutableRefObject<HTMLInputElement>;
  const contentRef = useRef() as MutableRefObject<HTMLInputElement>;
  const titleRef = useRef() as MutableRefObject<HTMLInputElement>;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/news/create/", {
        datetime: new Date(`${dateRef.current.value}`),
        content: contentRef.current.value,
        title: titleRef.current.value,
      })
      .then(() => {
        toast.success("News created successfully");
      })
      .catch((error) => {
        toast.error(`/news/create/ (${error.code}): ${error.message}`);
        throw error;
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
            placeholder="Title"
            required
            ref={titleRef}
          />
        </div>

        <div className="col-12 col-md-6 my-2">
          <input
            type="textarea"
            className="form-control"
            placeholder="Content"
            required
            ref={contentRef}
          />
        </div>
      </div>

      <button
        className="btn eventBtn my-3"
        style={{ width: "100px" }}
        type="submit"
      >
        Create
      </button>
    </form>
  );
}
