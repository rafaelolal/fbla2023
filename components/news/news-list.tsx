import News from "./news";
import { NewsType } from "../../types/news";
import Link from "next/link";

export default function NewsList(props: { news: NewsType[] }) {
  return (
    <div className="row bg-lightTertiary py-3 neoBorder">
      {props.news.map((newsItem, i) => (
        <News
          key={i}
          pk={newsItem.pk}
          title={newsItem.title}
          content={newsItem.content}
          createdOn={newsItem.createdOn}
        />
      ))}
    </div>
  );
}
