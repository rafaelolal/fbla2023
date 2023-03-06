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

      <div className="row mt-4 justify-content-center">
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          Create Event
        </button>
        <div className="pt-1 neoBorder  bg-light">
          <h2 className="mb-2 py-4 text-center">Events</h2>
          <DashboardEventList mutate={mutate} events={data} />
        </div>
      </div>
    </>
  );
}
