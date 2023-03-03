import { useRef } from "react";
import NewsList from "../../components/news/news-list";
import { NewsType } from "../../types/news";
import axios from "axios";
import Footer from "../../components/layout/footer";

export default function IndexPage(props: { news: NewsType[] }) {
  const initialNews = useRef<NewsType[]>(props.news);

  console.log({ initialNews });

  return (
    <>
      <div className="mx-4">
        <NewsList news={initialNews.current} />
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const response = await axios.get("http://127.0.0.1:8000/api/news/");
  return {
    props: {
      news: response.data,
      bodyStyle: { backgroundColor: "white" },
    },
  };
}
