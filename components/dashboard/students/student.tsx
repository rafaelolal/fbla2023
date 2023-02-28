import axios from "axios";
import { toast } from "react-toastify";
import { KeyedMutator } from "swr";
import { DashboardStudentType } from "../../../types/students";

export default function DashboardStudent(
  props: DashboardStudentType & { mutate: KeyedMutator<any> }
) {
  function deleteHandler(id: string) {
    console;
    axios
      .post("/api/deleteStudent", {
        id,
      })
      .then(function (response) {
        toast.success(response.data.message);

        if (response.status == 200) {
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
          {props.firstName} is currently in grade {props.grade}, ranked{" "}
          {props.rank} with {props.points} points
        </h6>
      </div>

      <div className="col-2 d-flex">
        <button
          className="btn eventBtn m-auto"
          onClick={() => deleteHandler(props.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
