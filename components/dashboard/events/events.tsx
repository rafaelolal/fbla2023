import axios from "axios";
import useSWR from "swr";
import DashboardEventList from "./event-list";
import AddEventForm from "./add-event-form";
import { toast } from "react-toastify";

export default function DashboardEvents() {
  const { data, error, mutate } = useSWR("/api/getEvents", async (url) => {
    return await axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        toast.success(`getEvents (${error}): ${error.message}`);
      });
  });

  if (error) return <div>An error occurred.</div>;
  if (!data) return <div>Loading ...</div>;

  return (
    <>
      <div className="row mt-4 justify-content-center">
        <div className="col-12 col-lg-4 ">
          <div className="neoBorder p-5">
            <h2 className="mb-2 ">Add An Event</h2>
            <AddEventForm />
          </div>
        </div>

        <div className="col-12 col-lg-7 mx-2 mt-5 mt-lg-0 ">
          <div className="pt-1 neoBorder">
            <h2 className="mb-2 py-4 px-5 border-bottom text-center w-100">
              Events
            </h2>
            <DashboardEventList mutate={mutate} events={data.data} />
          </div>
        </div>
      </div>
    </>
  );
}
