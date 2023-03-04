import axios from "axios";
import { toast } from "react-toastify";
import { KeyedMutator } from "swr";
import { DashboardStudentType } from "../../../types/students";

export default function DashboardStudent(
  props: DashboardStudentType & { mutate: KeyedMutator<any> }
) {
  function handleDelete(pk: string) {
    axios
      .delete(`http://127.0.0.1:8000/api/student/${pk}/destroy/`)
      .then(() => {
        props.mutate();
        toast.success("Student deleted successfully");
      })
      .catch((error) => {
        toast.error(
          `/student/${pk}/destroy/ (${error.code}): ${error.message}`
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
            : `${props.firstName} ${props.middleName} ${props.lastName}`}
        </h6>
      </div>

      <div className="col-3  d-flex">
        <h6 className="my-auto text-break">{props.pk}</h6>
      </div>

      <div className="col-3 d-flex">
        <h6 className="my-auto">
          {props.grade === null ? "N/A" : props.grade}
        </h6>
      </div>

      <div className="col-2 d-flex">
        <button
          className="btn eventBtn m-auto"
          onClick={() => handleDelete(props.pk)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
