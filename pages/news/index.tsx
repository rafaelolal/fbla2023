import { useRef } from "react";
import NewsList from "../../components/news/news-list";
import { NewsType } from "../../types/news";
import axios from "axios";
import Footer from "../../components/layout/footer";

export default function NewsListPage(props: { news: NewsType[] }) {
  const initialNews = useRef<NewsType[]>(props.news);

  return (
    <>
    <div className="newsroom-container" >
      <div className="col-8 col-md-7 col-xxl-5 mx-auto" style={{padding: "4% 0 8%"}}>
        <h1 className="m-auto fw-bold text-primary text-center mb-4"
          style={{ fontSize: "4rem", zIndex: "10" }} >Seal Coast Weekly</h1>
        <NewsList news={initialNews.current} orange={false} />
      </div>
      
    </div>
    <Footer /></>
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
      bodyStyle: { backgroundColor: "#a0d8ea" },
    },
  };
}
