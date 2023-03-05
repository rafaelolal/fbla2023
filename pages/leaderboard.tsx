import axios from "axios";
import Footer from "../components/layout/footer";
import LeaderboardRow from "../components/leaderboard-row";
import { toFormattedDate } from "../helpers";
import { LeaderboardStudentType } from "../types/students";

export default function LeaderboardPage(props: {
  students: LeaderboardStudentType[];
  leaderboard: { createdOn: string };
}) {
  return (
    <>
      <div className="w-100 p-0 p-0 border-0 leaderboard-bg">
        <h6
          className="bg-lightTertiary text-dark ms-auto me-3 py-1 px-3 "
          style={{
            width: "fit-content",
            borderRadius: "20px",
          }}
        >
          Leaderboard updated on: {toFormattedDate(props.leaderboard.createdOn)}
        </h6>
        <div className="container" style={{ padding: "7% 0" }}>
          <div className="col-10 col-md-8 col-xl-7 fs-4 mx-auto pt-5 ">
            <div
              className="container-fluid neoBorder pb-4  b-radius-normal position-relative px-0  "
              style={{
                backgroundColor: "#e6f9ff",
              }}
            >
              <div className="row justify-content-center position-relative">
                <div
                  className="col-auto border-normal bg-secondary text-light position-absolute bottom-50"
                  style={{ borderRadius: "20px" }}
                >
                  <h1 className="py-1 px-3 fw-bold">Leaderboard</h1>
                </div>

                <h1 className="text-primary px-3">i</h1>
              </div>
              <div
                className="row px-3 mx-3 border-thin mb-3 bg-lightTertiary"
                style={{ borderRadius: "20px" }}
              >
                <div
                  className="col-2 col-lg-3 text-center  py-2 fs-5"
                  style={{ borderRight: "3px solid #000" }}
                >
                  Rank
                </div>

                <div
                  className="col-8 col-lg-6 text-center py-2 fs-5"
                  style={{ borderRight: "3px solid #000" }}
                >
                  Student
                </div>
                <div className="col-2 col-lg-3 text-center py-2 fs-5">
                  Points
                </div>
              </div>
              <div>
                {props.students.map((student, i) => (
                  <LeaderboardRow
                    key={i}
                    email={student.email}
                    image={student.image}
                    firstName={student.firstName}
                    middleName={student.middleName}
                    lastName={student.lastName}
                    rank={student.rank}
                    points={student.points}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const leaderboardResponse = await axios
    .get("http://127.0.0.1:8000/api/leaderboard/1/")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });

  const studentsResponse = await axios
    .get("http://127.0.0.1:8000/api/students/leaderboard/")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });

  return {
    props: {
      leaderboard: leaderboardResponse.data,
      bodyStyle: { backgroundColor: "#67dbeb" },
    },
  };
}
