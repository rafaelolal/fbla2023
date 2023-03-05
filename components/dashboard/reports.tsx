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
      <div className="row justify-content-center">
        <div className="col-8 my-4 p-0">
          <div className="container neoBorder">
            <div className="row ">
              <div
                className="col-auto d-flex"
                style={{ borderRight: "3px solid black" }}
              >
                <h2 className="my-auto p-3">Reports</h2>
              </div>

              <div className="col d-flex">
                
                
                  <button
                  className="btn eventBtn m-3 me-5 my-auto"
                  onClick={handleCreate}
                >
                  Create Report
                </button>
                <div className=" d-inline-block m-1 my-auto">View Report:</div>

                <select
                  className="form-select d-inline-block m-3 my-auto"
                  style={{flex: "1"}}
                  aria-label="Select Report"
                  defaultValue="report Date"
                  ref={reportRef}
                  onChange={retrieveHandler}
                >
                  <option selected>Report Date</option>
                  {data.map((news: { createdOn: string }, i: number) => (
                    <option key={i} value={news.createdOn}>
                      {news.createdOn}
                    </option>
                  ))}
                </select>

                
             
              </div>
            </div>
          </div>
          
          <div className="container  my-5 neoBorder">
            <h2 className="text-center py-4 px-5">Data</h2>

            <div className="row justify-content-around py-3 px-5 border-bottom border-top bg-primary">
              <div className="col-4 d-flex border-end">
                <h5 className="m-auto">Name</h5>
              </div>

              <div className="col-4 d-flex border-end">
                <h5 className="m-auto">Points</h5>
              </div>

              <div className="col-4 d-flex">
                <h5 className="m-auto">Grade</h5>
              </div>
            </div>

            {currentReport &&
              currentReport.map((report, i) => (
                <div
                  key={i}
                  className="row justify-content-around py-3  px-5 border-bottom"
                >
                  <div className="col-4 d-flex ">
                    <h5 className="m-auto">
                      {report.firstName +
                        " " +
                        (report.middleName || "") +
                        " " +
                        (report.lastName || "")}
                    </h5>
                  </div>

                  <div className="col-4 d-flex">
                    <h5 className="m-auto">{report.points}</h5>
                  </div>

                  <div className="col-4 d-flex">
                    <h5 className="m-auto">{report.grade || "N/A"}</h5>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
