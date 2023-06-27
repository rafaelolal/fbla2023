import { gql } from "@apollo/client";
import client from "../../api/apollo-client";
import { MutableRefObject, useRef } from "react";

export default function GroupsPage(props: any) {
  const privateKeyRef = useRef() as MutableRefObject<HTMLInputElement>;

  const joinByKey = () => {
    return privateKeyRef.current.value;
  };

  const joinGroup = (id) => {
    return id;
  };

  return (
    <>
      <h6 className="fw-semibold">Private Key</h6>
      <input type="password" className="form-control" ref={privateKeyRef} />
      <button className="btn btn-primary" onClick={joinByKey}>
        Join
      </button>

      {props.groups.map((group) => (
        <>
          <p>Name: {group.name}</p>
          <p>Description: {group.description}</p>
          <p>Key: {group.key}</p>
          <p>Members {group.members.length}</p>
          <button
            className="btn btn-primary"
            onClick={() => joinGroup(group.id)}
          >
            Join
          </button>
        </>
      ))}
    </>
  );
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query {
        listGroups {
          id
          name
          description
          isPrivate
          key
          members {
            isAdmin
          }
        }
      }
    `,
  });

  return {
    props: {
      groups: data.listGroups,
      bodyStyle: { backgroundColor: "white" },
    },
  };
}
