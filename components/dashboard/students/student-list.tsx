import axios from "axios";
import useSWR from "swr";
import DashboardStudent from "./student";
import { DashboardStudentType } from "../../../types/students";
import { toast } from "react-toastify";
import { useState } from "react";
import StudentCreateModal from "./student-create-modal";

export default function DashboardStudentList() {
  const [showCreateModal, setShowCreateModal] = useState(false);

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
      <StudentCreateModal
        show={showCreateModal}
        setShow={setShowCreateModal}
        mutate={mutate}
      />

      <div className="row justify-content-center">
        <div className="col-10 col-lg-8 my-4 p-0">
          <div className="container neoBorder  bg-light">
            <div className="row ">
              <div
                className="col-auto d-flex"
                style={{ borderRight: "3px solid black" }}
              >
                <h2 className="my-auto p-3">Students</h2>
              </div>

              <div className="col d-flex">
                <button
                  className="btn eventBtn m-3 me-5 my-auto"
                  onClick={() => setShowCreateModal(true)}
                >
                  Create Student
                </button>
              </div>
            </div>
          </div>

          <div className="container-fluid neoBorder my-5 bg-light">
            <div className="row justify-content-around py-3 px-3 border-bottom border-top bg-primary">
              <div className="col-3 d-flex border-end">
                <h5 className="m-auto">Student Name</h5>
              </div>

              <div className="col-3 d-flex border-end">
                <h5 className="m-auto">id</h5>
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
                  id={student.id}
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
    </>
  );
}
