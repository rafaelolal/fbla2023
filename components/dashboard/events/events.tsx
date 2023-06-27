import { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import DashboardEventList from "./event-list";
import { toast } from "react-toastify";
import CreateModal from "./event-create-modal";

export default function DashboardEvents() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { data, error, mutate } = useSWR(
    "http://127.0.0.1:8000/api/events/dashboard",
    async (url) => {
      return await axios
        .get(url)
        .then((response) => response.data)
        .catch((error) => {
          toast.error(`/events/dashboard/ (${error}): ${error.message}`);
          throw error;
        });
    }
  );

  if (error) return <div>An error occurred.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <CreateModal
        show={showCreateModal}
        setShow={setShowCreateModal}
        mutate={mutate}
      />
      <div className="row justify-content-center">
        <div className="col-8 my-4 p-0">
          <div className="container neoBorder  bg-light">
            <div className="row ">
              <div
                className="col-auto d-flex"
                style={{ borderRight: "3px solid black" }}
              >
                <h2 className="my-auto p-3">Events</h2>
              </div>

              <div className="col d-flex">
                <button
                  className="btn btn eventBtn m-3 me-5 my-auto"
                  onClick={() => setShowCreateModal(true)}
                >
                  Create Event
                </button>
              </div>
            </div>
          </div>

          <div className="container-fluid  my-5 neoBorder  bg-light">
            <DashboardEventList mutate={mutate} events={data} />
          </div>
        </div>
      </div>
    </>
  );
}
