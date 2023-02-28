import axios from "axios";
import useSWR from "swr";
import DashboardStudent from "./student";
import { DashboardStudentType } from "../../../types/students";
import StudentSignUp from "./student-sign-up";
import { toast } from "react-toastify";

export default function DashboardStudentList() {
  const { data, error, mutate } = useSWR("/api/getStudents", async (url) => {
    return await axios
      .get(url)
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        toast.success(`getStudents (${error.code}): ${error.message}`);
      });
  });

  if (error) return <div>An error occurred.</div>;
  if (!data) return <div>Loading ...</div>;

  return (
    <>
      <div className="row mt-4 justify-content-center">
        <div className="col-12 col-lg-4 ">
          <div className="neoBorder p-5">
            <h2 className="mb-2">Create Student Account</h2>
            <StudentSignUp mutate={mutate} />
          </div>
        </div>

        <div className="col-12 col-lg-7 mx-2 mt-5 mt-lg-0">
          <div className="pt-1 neoBorder">
            <h2 className="mb-2 py-4 px-5 border-bottom text-center w-100">
              Students
            </h2>
            <div className="container">
              <div className="row justify-content-around py-3 px-2 border-bottom">
                <div className="col-3 d-flex border-end">
                  <h5 className="m-auto">Student Name</h5>
                </div>
                <div className="col-3 d-flex border-end">
                  <h5 className="m-auto">Id</h5>
                </div>
                <div className="col-3 d-flex border-end">
                  <h5 className="m-auto">Description</h5>
                </div>
                <div className="col-2 d-flex">
                  <h5 className="m-auto">Action</h5>
                </div>
              </div>
              {data &&
                data.map((student: DashboardStudentType, i: number) => (
                  <DashboardStudent
                    key={i}
                    id={student.id}
                    firstName={student.firstName}
                    middleName={student.middleName}
                    lastName={student.lastName}
                    grade={student.grade}
                    points={student.points}
                    rank={student.rank}
                    mutate={mutate}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
