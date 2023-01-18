export default function Leaderboard(
  props: {
    firstName: string;
    middleName: string;
    lastName: string;
    points: number;
    rank: number | null;
    difference: number;
  }[]
) {
  return props.map((student) => {
    <p>
      {`${student.firstName} ${student.middleName.substring(0, 1)} ${
        student.lastName
      }`}{" "}
      ranked ${student.rank} with ${student.points} points changed by $
      {student.difference}
    </p>;
  });
}
