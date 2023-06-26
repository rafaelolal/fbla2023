import axios from "axios";
import { toast } from "react-toastify";
import { KeyedMutator } from "swr";
import { DashboardStudentType } from "../../../types/students";

export default function DashboardStudent(
  props: DashboardStudentType & { mutate: KeyedMutator<any> }
) {
  function handleDelete(id: string) {
    axios
      .delete(`http://127.0.0.1:8000/api/student/${id}/destroy/`)
      .then(() => {
        props.mutate();
        toast.success("Student deleted successfully");
      })
      .catch((error) => {
        toast.error(
          `/student/${id}/destroy/ (${error.code}): ${error.message}`
        );
        throw error;
      });
  }

  return (
    <div className="row justify-content-around py-3 px-2 border-bottom">
      <div className="col-3 d-flex">
        <h6 className="my-auto">
          {![props.firstName, props.middleName, props.lastName].every((i) =>
            Boolean(i)
          )
            ? `${props.email}`
            : `${props.lastName}, ${props.firstName} ${props.middleName}`}
        </h6>
      </div>

      <div className="col-3  d-flex">
        <h6 className="my-auto text-break">{props.id}</h6>
      </div>

      <div className="col-3 d-flex">
        <h6 className="m-auto">{props.grade === null ? "N/A" : props.grade}</h6>
      </div>

      <div className="col-2 d-flex">
        <button
          className="btn eventBtn m-auto"
          onClick={() => handleDelete(props.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
