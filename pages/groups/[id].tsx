import { GetServerSidePropsContext } from "next";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { gql } from "@apollo/client";
import GroupUpdateModal from "../../components/groups/groupUpdateModal";
import { useAppContext } from "../../context/state";
import client from "../../api/apollo-client";

export default function GroupPage(props: any) {
  const { user } = useAppContext();
  const announcementRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const [showUpdate, setShowUpdate] = useState(false);
  const [isAdmin, setIsAdmin] = useState(undefined);
  const mLocalizer = momentLocalizer(moment);
  const formattedEvents = props.events.map((e) => ({
    id: e.event.id,
    title: e.event.title,
    start: new Date(e.event.startsOn),
    end: new Date(e.event.finishesOn),
  }));

  useEffect(() => {
    if (!user) {
      return;
    }

    const found = props.members.find((m) => m.member.id == user.uid);
    setIsAdmin(found && found.isAdmin);
  }, [user]);

  const createAnnouncement = () => {
    return announcementRef.current.value;
  };

  return (
    <>
      <GroupUpdateModal
        data={{
          id: props.id,
          name: props.name,
          description: props.description,
          isPrivate: props.isPrivate,
        }}
        show={showUpdate}
        setShow={setShowUpdate}
      />

      <div className="row py-3 mx-3">
        <div className="col-6">
          <h2 className="text-center pt-1">{props.name}</h2>

          <h6 className="py-1 text-center">{props.description}</h6>
          <h6 className="py-1 text-center">Members: {props.members.length}</h6>

          {isAdmin && (
            <button
              className="btn btn-primary"
              onClick={() => setShowUpdate(true)}
            >
              Update Information
            </button>
          )}
        </div>

        <div className="col-6">
          <h2>Announcements</h2>

          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {props.announcements.map((a) => (
              <>
                <p>created by: {a.createdBy.firstName}</p>
                <p>created on: {a.createdOn}</p>
                <p>content: {a.content}</p>
              </>
            ))}
          </div>

          {isAdmin && (
            <>
              <textarea
                className="form-control"
                placeholder="Create Announcement"
                ref={announcementRef}
              />
              <button className="btn btn-primary" onClick={createAnnouncement}>
                Create
              </button>
            </>
          )}
        </div>
      </div>

      <div className="col-12 col-md mt-4 mt-md-0">
        <Calendar
          style={{ height: "calc(100vh - 200px)" }}
          events={formattedEvents}
          defaultDate={new Date()}
          localizer={mLocalizer}
          eventPropGetter={(event: {
            id: number;
            title: string;
            start: Date;
            end: Date;
          }) => {
            let backgroundColor = "#ffb158";

            if (new Date(event.start) > new Date()) {
              backgroundColor = "#56becd";
            } else if (
              props.events.find((e) => e.event.id == event.id)?.attended
            ) {
              backgroundColor = "#bbbbbb";
            }

            return { style: { backgroundColor } };
          }}
        />
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;

  const { data } = await client.query({
    query: gql`
      query ($id: String!) {
        retrieveGroup(id: $id) {
          name
          description
          isPrivate
          key
          members {
            member {
              id
              image
              firstName
              middleName
              lastName
            }
            isAdmin
          }
          events {
            event {
              id
              title
              startsOn
              finishesOn
            }
            addedBy {
              image
              firstName
              middleName
              lastName
            }
          }
          announcements {
            createdBy {
              firstName
              middleName
              lastName
              image
            }
            createdOn
            content
          }
        }
      }
    `,
    variables: {
      id,
    },
  });

  return {
    props: {
      ...data.retrieveGroup,
      bodyStyle: { backgroundColor: "white" },
    },
  };
}
