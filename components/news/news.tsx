import { NewsType } from "../../types/news";

export default function News(props: NewsType) {
  return (
    <div className="col-12">
      <div className="card">
        <div className="card-header">
          {new Date(props.datetime).toLocaleString(undefined, {
            timeZone: "UTC",
            year: "numeric",
            month: "long",
            day: "2-digit",
            weekday: "long",
          })}
        </div>
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.description}</p>
        </div>
      </div>
    </div>
  );
}