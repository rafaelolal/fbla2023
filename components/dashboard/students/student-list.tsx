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
      <div className="row mt-4">
        <div className="col-12 col-lg-4 ">
          <div className="neoBorder p-5 m-4">
            <h2 className="mb-2">Create Student Account</h2>
            <StudentSignUp mutate={mutate} />
          </div>
        </div>

        <div className="col-12 col-lg-7 mt-5 mt-lg-0">
          <div className="row justify-content-start ">
            <h2 className="mb-2">Students</h2>
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
    </>
  );
}
