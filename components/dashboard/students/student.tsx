import axios from "axios";
import { toast } from "react-toastify";
import { KeyedMutator } from "swr";
import { DashboardStudentType } from "../../../types/students";

export default function DashboardStudent(
  props: DashboardStudentType & { mutate: KeyedMutator<any> }
) {
  function deleteHandler(pk: string) {
    console;
    axios
      .delete(`http://127.0.0.1:8000/api/student/${pk}/destroy/`)
      .then(function (response) {
        if (response.status == 204) {
          toast.success("Student deleted successfully");
          props.mutate();
        }
      })
      .catch(function (error) {
        toast.error(`deleteStudent (${error.code}): ${error.message}`);
      });
  }

  return (
    <div className="row justify-content-around py-3 px-2 border-bottom">
      <div className="col-3 d-flex">
        <h6 className="my-auto">
          {props.firstName} {props.middleName} {props.lastName}
        </h6>
      </div>

      <div className="col-3  d-flex">
        <h6 className="my-auto text-break">{props.id}</h6>
      </div>

      <div className="col-3 d-flex">
        <h6 className="my-auto">
          {props.firstName} is currently in grade {props.grade}
        </h6>
      </div>

      <div className="col-2 d-flex">
        <button
          className="btn eventBtn m-auto"
          onClick={() => deleteHandler(props.pk)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
