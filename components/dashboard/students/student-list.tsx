import axios from "axios";
import useSWR from "swr";
import DashboardStudent from "./student";
import { DashboardStudentType } from "../../../types/students";
import StudentSignUp from "./student-sign-up";
import { toast } from "react-toastify";

export default function DashboardStudentList() {
  const { data, error, mutate } = useSWR(
    "http://127.0.0.1:8000/api/students/",
    async (url) => {
      return await axios
        .get(url)
        .then((response) => response.data)
        .catch((error) => {
          toast.success(`/students/ (${error.code}): ${error.message}`);
        });
    }
  );

  if (error) return <div>An error occurred.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <div className="row mt-4 justify-content-center">
        <div className="col-12 col-lg-4 ">
          <div className="neoBorder  bg-light p-5">
            <h2 className="mb-2">Create Student Account</h2>
            <StudentSignUp mutate={mutate} />
          </div>
        </div>

        <div className="col-12 col-lg-7 mx-2 mt-5 mt-lg-0">
          <div className="pt-1 neoBorder  bg-light">
            <h2 className="mb-2 py-4 px-5 text-center w-100">Students</h2>
            <div className="container-fluid">
              <div className="row justify-content-around py-3 px-2 border-bottom border-top bg-primary">
                <div className="col-3 d-flex border-end">
                  <h5 className="m-auto">Student Name</h5>
                </div>

                <div className="col-3 d-flex border-end">
                  <h5 className="m-auto">PK</h5>
                </div>

                <div className="col-3 d-flex border-end">
                  <h5 className="m-auto">Grade</h5>
                </div>

                <div className="col-2 d-flex">
                  <h5 className="m-auto">Action</h5>
                </div>
              </div>

              {data &&
                data.map((student: DashboardStudentType, i: number) => (
                  <DashboardStudent
                    key={i}
                    pk={student.pk}
                    firstName={student.firstName}
                    middleName={student.middleName}
                    lastName={student.lastName}
                    grade={student.grade}
                    email={student.email}
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
