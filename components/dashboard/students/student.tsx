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
    <div className="card m-3" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">
          {props.firstName} {props.middleName} {props.lastName}
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">
          <span className="text-dark">Id:</span> {props.id}
        </h6>
        <p className="card-text">
          {props.firstName} is currently in grade {props.grade}, ranked{" "}
          {props.rank} with {props.points} points
        </p>
        <button
          className="btn eventBtn"
          onClick={() => deleteHandler(props.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
