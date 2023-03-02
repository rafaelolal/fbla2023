import { LeaderboardStudentType } from "../types/students";

export default function LeaderboardRow(props: LeaderboardStudentType) {
  return (
    <div className="row">
      <div className="col col-3">{props.rank}</div>
      <div className="col col-3">{props.points}</div>
      {![props.firstName, props.middleName, props.lastName].every((i) =>
        Boolean(i)
      ) ? (
        <div className="col col-6">{props.email}</div>
      ) : (
        <>
          <div className="col col-3">{props.lastName}</div>
          <div className="col col-3">
            {props.firstName} {props.middleName.slice(0, 1)}.
          </div>
        </>
      )}
    </div>
  );
}
