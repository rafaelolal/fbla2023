import { LeaderboardStudentType } from "../types/students";

export default function LeaderboardRow(props: LeaderboardStudentType) {
  const icons = [
    "/images/leaderboard/1 place icon.svg",
    "/images/leaderboard/2 place icon.svg",
    "/images/leaderboard/3 place icon.svg",
  ];
  return (
    <>
      <div
        className="row py-2 border-thin m-3 bg-light"
        style={{ borderRadius: "20px", zIndex: "10" }}
      >
        <div className="col-3 col-lg-3 d-flex">
          <h3
            className="my-auto mx-auto fw-semibold "
            style={{ color: "#3ba4aa" }}
          >
            {[1, 2, 3].includes(props.rank as number) ? (
              <img
                height={70}
                width={70}
                src={icons[(props.rank as number) - 1]}
              ></img>
            ) : (
              `${props.rank === null ? "N/A" : props.rank}`
            )}
          </h3>
        </div>

        <div className="col-6 col-lg-6 d-flex">
          <div className="my-auto mx-auto mx-md-0 text-center text-md-start fs-6 fs-md-4">
            <img
              className="border- mx-4"
              src={props.image}
              style={{ width: "3rem", height: "3rem", borderRadius: "50%" }}
            />
            <br className="d-block d-md-none"></br>
            {![props.firstName, props.middleName, props.lastName].every((i) =>
              Boolean(i)
            ) ? (
              <>{props.email}</>
            ) : (
              <>
                {props.firstName} {props.middleName.slice(0, 1)}.{" "}
                {props.lastName}
              </>
            )}
          </div>
        </div>

        <div className="col-3 col-lg-3 d-flex">
          <h4 className="my-auto mx-auto">{props.currentPoints}</h4>
        </div>
      </div>
    </>
  );
}
