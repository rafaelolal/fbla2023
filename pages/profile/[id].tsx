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

      <div className="row justify-content-center m-3">
        <div className="col-12 col-md-3 col-auto  my-2 ">
          <div className="col bg-primary p-4 neoBorder">
            <img
              className="mx-auto mb-2"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                border: "2px solid black",
                borderRadius: "50%",
              }}
              src={`/images/profiles/${props.student.image}`}
            />
            <hr></hr>
            {props.student.awards.map((award, i) => (
              <h6 key={i}>{award.name}</h6>
            ))}
            <h6 className="fw-bold text-center pt-1">
              {"   "}
              {props.student.firstName} {props.student.middleName}{" "}
              {props.student.lastName}{" "}
            </h6>
            <h6 className="text-center pt-1">
              Grade:
              {"   "}
              {props.student.grade}
            </h6>
            <hr></hr>

            <h6 className="py-1 text-center">
              {"   "}
              {props.student.bio}
            </h6>

            <hr></hr>

            <div className="mt-4 mx-auto" style={{ width: "fit-content" }}>
              <button className="btn eventBtn mx-3" onClick={toggleUpdateModal}>
                Update Profile
              </button>
              <button
                className="btn eventBtn mx-3"
                onClick={togglePasswordModal}
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-9">
          <div className="col bg-primary my-2 neoBorder p-1">
            <h3 className="d-inline mx-2 fw-semibold align-middle">Stats</h3>
            <img
              className=" mx-3 d-inline"
              style={{ height: "100%", width: "auto" }}
              src="/images/yellow fish.svg"
            ></img>
            <h5 className="d-inline mx-2 align-middle">
              Rank: {props.student.rank}
            </h5>
            <h5 className="d-inline mx-2 align-middle">
              Attended:{" "}
              {
                props.student.events.filter((event) => event.attended == true)
                  .length
              }
            </h5>
            <h5 className="d-inline mx-2 align-middle">
              Points: {props.student.points}
            </h5>
            <h5 className="d-inline mx-2 align-middle">
              {" "}
              Joined: {props.student.events.length}
            </h5>
          </div>
          <div className="col">
            <h6 className="d-inline-block mx-2">
              {" "}
              <div
                className="d-inline-block mx-1"
                style={{
                  width: "11px",
                  height: "11px",
                  backgroundColor: "#ffb158",
                }}
              ></div>
              - Missed Events
            </h6>
            <h6 className="d-inline-block mx-2">
              {" "}
              <div
                className="d-inline-block mx-1"
                style={{
                  width: "11px",
                  height: "11px",
                  backgroundColor: "gray",
                }}
              ></div>
              - Past Attended Events
            </h6>
            <h6 className="d-inline-block mx-2">
              {" "}
              <div
                className="d-inline-block mx-1"
                style={{
                  width: "11px",
                  height: "11px",
                  backgroundColor: "#56becd",
                }}
              ></div>
              - Future events
            </h6>
          </div>
          <div className="col my-4">
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
                var backgroundColor: string = "#ffb158";

                if (new Date(event.start) > new Date()) {
                  backgroundColor = "#56becd";
                } else if (
                  props.student.events.find((e) => e.eventId == event.id)!
                    .attended
                ) {
                  backgroundColor = "gray";
                }

                return { style: { backgroundColor } };
              }}
              style={{ height: 600 }}
            />
          </div>
        </div>
      </div>
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
      props: {
        bodyStyle: { backgroundColor: "white" },
      },
    },
  };
}
