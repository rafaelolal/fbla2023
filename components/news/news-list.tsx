import News from "./news";
import { NewsType } from "../../types/news";

export default function NewsList(props: { news: NewsType[] }) {
  return (
    <div className="row bg-lightTertiary py-3 neoBorder">
      {props.news.map((newsItem, i) => (
        <News
          key={i}
          id={newsItem.id}
          name={newsItem.name}
          description={newsItem.description}
          datetime={newsItem.datetime}
        />
      ))}
    </div>
  );
}
