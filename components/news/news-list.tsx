import News from "./news";
import { NewsType } from "../../types/news";

export default function NewsList(props: { news: NewsType[], orange: boolean }) {
  return (
    <div className={`container ${props.orange ? "bg-lightTertiary" : "bg-primary"} justify-content-center p-3 neoBorder`}>
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
