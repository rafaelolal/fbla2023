import { useRef } from "react";
import NewsList from "../../components/news/news-list";
import { NewsType } from "../../types/news";
import axios from "axios";
import Footer from "../../components/layout/footer";

export default function IndexPage(props: { news: NewsType[] }) {
  const initialNews = useRef<NewsType[]>(props.news);

  return (
    <>
      <div className="col-11 mx-auto my-5">
        <h1 className="mt-5 pt-5 mb-4 text-center">Seal Coast Weekly</h1>
        <NewsList news={initialNews.current} />
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const response = await axios
    .get("http://127.0.0.1:8000/api/news/")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });

  return {
    props: {
      news: response.data,
      bodyStyle: { backgroundColor: "white" },
    },
  };
}
