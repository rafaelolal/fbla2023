import axios from "axios";
import { StudentPropsType } from "./types";

export default function DashboardStudent(props: StudentPropsType) {
  function deleteHandler(id: string) {
    console;
    axios
      .post("/api/deleteStudent", {
        id,
      })
      .then(function (response) {
        console.log({ deleteStudentResponse: response });

        if (response.status == 200) {
          props.mutate();
        }
      })
      .catch(function (error) {
        console.log({ deleteStudentError: error });
      });
  }

  return (
    <div className="col">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">
            {props.firstName} {props.middleName} {props.lastName}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">{props.id}</h6>
          <p className="card-text">
            {props.firstName} is currently in grade {props.grade}, ranked{" "}
            {props.rank} with {props.points} points
          </p>
          <button
            className="btn btn-primary"
            onClick={() => deleteHandler(props.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}