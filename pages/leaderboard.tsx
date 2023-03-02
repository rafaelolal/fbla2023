import axios from "axios";
import Footer from "../components/layout/footer";
import LeaderboardRow from "../components/leaderboard-row";
import { LeaderboardStudentType } from "../types/students";

export default function LeaderboardPage(props: {
  students: LeaderboardStudentType[];
  leaderboard: { createdOn: string };
}) {
  return (
    <>
      <h1>Leaderboard created on: {props.leaderboard.createdOn}</h1>
      <div className="row">
        <div className="col col-3">Rank</div>
        <div className="col col-3">Points</div>
        <div className="col col-3">Last name</div>
        <div className="col col-3">First Name</div>
      </div>
      <div>
        {props.students.map((student, i) => (
          <LeaderboardRow
            key={i}
            email={student.email}
            firstName={student.firstName}
            middleName={student.middleName}
            lastName={student.lastName}
            rank={student.rank}
            points={student.points}
          />
        ))}
      </div>
      <Footer />;
    </>
  );
}

export async function getServerSideProps() {
  const leaderboardResponse = await axios.get(
    "http://127.0.0.1:8000/api/leaderboard/1/"
  );

  const studentsResponse = await axios.get(
    "http://127.0.0.1:8000/api/students/leaderboard/"
  );

  return {
    props: {
      students: studentsResponse.data,
      leaderboard: leaderboardResponse.data,
      bodyStyle: { backgroundColor: "white" },
    },
  };
}
