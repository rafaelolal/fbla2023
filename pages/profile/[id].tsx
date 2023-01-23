import "react-big-calendar/lib/css/react-big-calendar.css";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import { PrismaClient } from "@prisma/client";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import UpdateModal from "../../components/profile/update-modal";
import { ProfileStudentType } from "../../types/students";
import { ProfileEventType } from "../../types/events";
import PasswordModal from "../../components/profile/password-modal";

const prisma = new PrismaClient();

export default function ProfilePage(props: {
  student: ProfileStudentType & { bio: string };
  events: ProfileEventType[];
}) {
  const [showUpdate, setShowUpdate] = useState(props.student.grade == -1);
  const [showPassword, setShowPassword] = useState(false);

  const mLocalizer = momentLocalizer(moment);
  const formattedEvents = props.events.map((e) => ({
    id: e.id,
    title: e.title,
    start: new Date(e.start),
    end: new Date(e.end),
  }));

  function toggleUpdateModal() {
    setShowUpdate(!showUpdate);
  }

  function togglePasswordModal() {
    setShowPassword(!showPassword);
  }

  return (
    <>
      <UpdateModal
        data={{
          id: props.student.id,
          firstName: props.student.firstName,
          middleName: props.student.middleName,
          lastName: props.student.lastName,
          grade: props.student.grade,
          bio: props.student.bio,
        }}
        firstTime={props.student.grade == -1}
        show={showUpdate}
        toggleModal={toggleUpdateModal}
      />

      <PasswordModal
        firstTime={props.student.grade == -1}
        show={showPassword}
        toggleModal={togglePasswordModal}
      />

      <div className="row">
        <div className="col">
          <img src={`/images/profiles/${props.student.image}`} />
          {props.student.awards.map((award, i) => (
            <p key={i}>{award.name}</p>
          ))}
          <p>
            Name: {props.student.firstName} {props.student.middleName}{" "}
            {props.student.lastName}
          </p>
          <p>Grade: {props.student.grade}</p>
          <p>Bio: {props.student.bio}</p>
          <button className="btn btn-primary me-2" onClick={toggleUpdateModal}>
            Update Profile
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={togglePasswordModal}
          >
            Update Password
          </button>
        </div>

        <div className="col">
          <h1>Stats</h1>
          <p>Rank: {props.student.rank}</p>
          <p>
            Attended:{" "}
            {
              props.student.events.filter((event) => event.attended == true)
                .length
            }
          </p>
          <p>Points: {props.student.points}</p>
          <p>Joined: {props.student.events.length}</p>
        </div>
      </div>
      <Calendar
        events={formattedEvents}
        defaultDate={new Date()}
        localizer={mLocalizer}
        eventPropGetter={(event: {
          id: number;
          title: string;
          start: Date;
          end: Date;
        }) => {
          var backgroundColor: string = "red";

          if (new Date(event.start) > new Date()) {
            backgroundColor = "blue";
          } else if (
            props.student.events.find((e) => e.eventId == event.id)!.attended
          ) {
            backgroundColor = "gray";
          }

          return { style: { backgroundColor } };
        }}
        style={{ height: 500 }}
      />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  const student = await prisma.student.findUniqueOrThrow({
    where: { id: id as string },
    include: { awards: true, events: true },
  });

  const events = await prisma.event.findMany({
    where: {
      id: { in: student.events.map((event) => event.eventId) },
    },
  });

  return {
    props: {
      student: JSON.parse(JSON.stringify(student)),
      events: JSON.parse(JSON.stringify(events)),
    },
  };
}
