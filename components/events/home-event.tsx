import Link from "next/link";
import { formatStartAndFinish } from "../../helpers";
import { HomeEventType } from "../../types/events";

export default function HomeEvent(props: HomeEventType) {
  return (
    <>
      <div className="d-inline-flex p-3">
        <div
          className="card bg-primary eventEffect b-radius-normal"
          style={{
            height: "auto",
            maxWidth: "390px",
          }}
        >
          <img
            src={
              props.image.includes("http")
                ? props.image
                : `/images/events/${props.image}`
            }
            style={{
              objectFit: "cover",
              width: "100%",
              height: "265px",
              borderTopRightRadius: "3px",
              borderTopLeftRadius: "3px",
              borderBottom: "solid 3px #000",
            }}
            alt="Event Image"
          />

          <div className="card-body d-flex flex-column">
            <h5 className="fw-bold fs-6">
              {props.cancelationReason && "CANCELED"} {props.title} (
              <span className="text-secondary"> {props.type}</span>) -{" "}
              <span className="text-tertiary">{props.points}</span> points
            </h5>

            <h6
              className="text-start fs-6 mb-3"
              style={{
                height: "fit-content",
              }}
            >
              {formatStartAndFinish(props.startsOn, props.finishesOn)} at{" "}
              {props.location}
            </h6>

            <Link className="mt-auto btn eventBtn" href={`/events#${props.pk}`}>
              Visit
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
