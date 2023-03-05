import axios from "axios";
import useSWR from "swr";
import DashboardEventList from "./event-list";
import AddEventForm from "./add-event-form";
import { toast } from "react-toastify";

export default function DashboardEvents() {
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
      <div className="row mt-4 justify-content-center">
        <div className="col-12 col-lg-4 ">
          <div className="neoBorder p-5">
            <h2 className="mb-2 ">Add An Event</h2>
            <AddEventForm mutate={mutate} />
          </div>
        </div>

        <div className="col-12 col-lg-7 mx-2 mt-5 mt-lg-0 ">
          <div className="pt-1 neoBorder">
            <h2 className="mb-2 py-4 text-center">Events</h2>
            <DashboardEventList mutate={mutate} events={data} />
          </div>
        </div>
      </div>
    </>
  );
}
