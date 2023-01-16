import { NewsType } from "../../types/news";
import News from "./news";

export default function NewsList(props: { news: NewsType[] }) {
  return (
    <div className="row">
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
