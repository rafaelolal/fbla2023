import Link from "next/link";
import { toFormattedDate } from "../../helpers";
import { NewsType } from "../../types/news";

export default function News(props: NewsType) {
  return (
    <div className=" my-2">
      <div className="card">
        <div className="card-header d-flex">
          <span className="fw-semibold " style={{flex: "1"}}>
           {toFormattedDate(props.createdOn)}
          </span>
          <Link
            className="text-quaternary"
            href={`/news/${props.pk}`}
            
          >
            <small className="ms-2 ">read more...</small>
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
