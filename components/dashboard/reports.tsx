import axios from "axios";
import { MutableRefObject, useRef, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

export default function DashboardReports() {
  const reportRef = useRef() as MutableRefObject<HTMLSelectElement>;
  const [currentReport, setCurrentReport] = useState<
    {
      createdOn: string;
      firstName: string;
      middleName: string | null;
      lastName: string | null;
      grade: number | null;
      points: number;
    }[]
  >();

  const { data, error, mutate } = useSWR(
    "http://127.0.0.1:8000/api/reports/",
    async (url) => {
      return await axios
        .get(url)
        .then((response) => response.data)
        .catch((error) => {
          toast.error(`/reports/ (${error}): ${error.message}`);
          throw error;
        });
    }
  );

  function handleCreate() {
    axios
      .post("http://127.0.0.1:8000/api/report/create/")
      .then((response) => {
        reportRef.current.value = response.data.createdOn;
        mutate();
        toast.success("Report created successfully");
      })
      .catch((error) => {
        toast.error(`/report/create/ (${error}): ${error.message}`);
        throw error;
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
          toast.error(`/report/${createdOn} (${error}): ${error.message}`);
          throw error;
        });
    }
  }

  if (error) return <div>An error occurred.</div>;
  if (!data) return <div>Loading ...</div>;

  return (
    <>
      <h1>Reports</h1>

      <button className="btn btn-primary" onClick={handleCreate}>
        Create Report
      </button>

      <p>View Report:</p>

      <select
        className=""
        aria-label="Select Report"
        defaultValue="Report Date"
        ref={reportRef}
        onChange={retrieveHandler}
      >
        {data.map((news: { createdOn: string }, i: number) => (
          <option key={i} value={news.createdOn}>
            {news.createdOn}
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
        currentReport.map((report, i) => (
          <div key={i} className="row">
            <div className="col col-3">
              {report.firstName +
                " " +
                report.middleName +
                " " +
                report.lastName}
            </div>
            <div className="col col-3">{report.points}</div>
            <div className="col col-3">
              {report.grade ? report.grade : "N/A"}
            </div>
          </div>
        ))}
    </>
  );
}
