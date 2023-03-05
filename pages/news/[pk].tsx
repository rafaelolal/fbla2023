import { GetServerSidePropsContext } from "next";
import { NewsType } from "../../types/news";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { toFormattedDatetime } from "../../helpers";

export default function NewsPage(props: { news: NewsType }) {
  return (
    <div className="m-4">
      <h1>{props.news.title}</h1>
      <p>Posted on: {toFormattedDatetime(props.news.createdOn)}</p>
      <ReactMarkdown className="reactMarkDown">{props.news.content}</ReactMarkdown>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { pk } = context.query;
  const response = await axios
    .get(`http://127.0.0.1:8000/api/news/${pk}/`)
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
