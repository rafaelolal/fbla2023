import axios from "axios";
import useSWR from "swr";

export default function DashboardStudents() {
  const { data, error } = useSWR("/api/getStudents", async (url) => {
    return await axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log({ getStudents: error });
      });
  });

  if (error) return <div>An error occurred.</div>;
  if (!data) return <div>Loading ...</div>;

  return (
    <>
      <div className="row gy-4">
        {data &&
          data.map((student, i) => (
            <div key={i} className="col">
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h5 className="card-title">
                    {student.firstName} {student.middleName} {student.lastName}
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {student.id}
                  </h6>
                  <p className="card-text">
                    {student.firstName} is currently in grade {student.grade},
                    ranked {student.rank} with {student.points} points
                  </p>
                  <a href="#" className="btn btn-primary">
                    Edit
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
