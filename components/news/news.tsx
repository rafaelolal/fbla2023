import { NewsType } from "../../types/news";

export default function News(props: NewsType) {
  return (
    <div className="col-12 my-3">
      <div className="card">
        <div className="card-header fw-semibold">
          {new Date(props.createdOn).toLocaleString(undefined, {
            timeZone: "UTC",
            year: "numeric",
            month: "long",
            day: "2-digit",
            weekday: "long",
          })}
        </div>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.content}</p>
        </div>
      </div>
    </div>
  );
}
