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
        return response.data;
      })
      .catch((error) => {
        toast.success(`getStudents (${error.code}): ${error.message}`);
      });
  });

  if (error) return <div>An error occurred.</div>;
  if (!data) return <div>Loading ...</div>;

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-4 px-5">
          <h2 className="mb-2">Create Student Account</h2>
          <StudentSignUp mutate={mutate} />
        </div>

        <div className="col-12 col-md-8 px-5 mt-5 mt-md-0">
          <div className="row justify-content-start">
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
