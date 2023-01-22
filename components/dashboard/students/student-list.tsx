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
      <div className="my-3 p-3" style={{ border: "solid 1px" }}>
        <StudentSignUp />
      </div>
      <div className="row gy-4">
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
    </>
  );
}
