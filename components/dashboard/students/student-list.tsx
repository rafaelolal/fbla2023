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

      <div className="row mt-4 justify-content-center">
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          Create Student
        </button>

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
    </>
  );
}
