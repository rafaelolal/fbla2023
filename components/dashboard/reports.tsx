import axios from "axios";
import { MutableRefObject, useRef, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

export default function DashboardReports() {
  const reportRef = useRef() as MutableRefObject<HTMLSelectElement>;
  const [currentReport, setCurrentReport] = useState();

  const { data, error, mutate } = useSWR(
    "http://127.0.0.1:8000/api/reports/",
    async (url) => {
      return await axios
        .get(url)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          toast.error(`reports/ (${error}): ${error.message}`);
        });
    }
  );

  function createHandler() {
    axios
      .post("http://127.0.0.1:8000/api/report/create/")
      .then((response) => {
        toast.success("Report created successfully");
      })
      .catch((error) => {
        toast.error(`reports/ (${error}): ${error.message}`);
      });
  }

  function retrieveHandler() {
    const createdOn = reportRef.current.value;
    if (createdOn != "Report Date") {
      axios
        .get(`http://127.0.0.1:8000/api/report/${createdOn}/`)
        .then((response) => {
          setCurrentReport(response.data);
        })
        .catch((error) => {
          toast.error(`report/${createdOn} (${error}): ${error.message}`);
        });
    }
  }

  if (error) return <div>An error occurred.</div>;
  if (!data) return <div>Loading ...</div>;

  return (
    <>
      <h1>Reports</h1>
      <button className="btn btn-primary" onClick={createHandler}>
        Create Report
      </button>
      <p>View Report:</p>
      <select
        className=""
        aria-label="Select Report"
        ref={reportRef}
        onChange={retrieveHandler}
      >
        <option selected>Report Date</option>
        {data.map((e: { createdOn: string }, i: number) => (
          <option key={i} value={e.createdOn}>
            {e.createdOn}
          </option>
        ))}
      </select>
      <h2>Report Data</h2>
      <div className="row">
        <div className="col col-3">Name</div>
        <div className="col col-3">Points</div>
        <div className="col col-3">Grade</div>
      </div>
      {currentReport &&
        currentReport.map((e, i) => (
          <div key={i} className="row">
            <div className="col col-3">
              {e.firstName + " " + e.middleName + " " + e.lastName}
            </div>
            <div className="col col-3">{e.points}</div>
            <div className="col col-3">{e.grade ? e.grade : "N/A"}</div>
          </div>
        ))}
    </>
  );
}
