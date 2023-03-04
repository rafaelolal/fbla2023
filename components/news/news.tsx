import Link from "next/link";
import { toFormattedDate } from "../../helpers";
import { NewsType } from "../../types/news";

export default function News(props: NewsType) {
  return (
    <div className="col-12 my-3">
      <div className="card">
        <div className="card-header">
          <span className="fw-semibold">
            {toFormattedDate(props.createdOn)}
          </span>
          <Link href={`/news/${props.pk}`} style={{ color: "orange" }}>
            <small className="ms-2">read more...</small>
          </Link>
        </div>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.content}</p>
        </div>
      </div>
    </div>
  );
}
