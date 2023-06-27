import { GetServerSidePropsContext } from "next";
import { NewsType } from "../../types/news";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { toFormattedDatetime } from "../../helpers";

export default function NewsPage(props: { news: NewsType }) {
  return (
    <div className="newsroom-container">
      <div
        className="col-11 col-md-9 col-xxl-6 mx-auto "
        style={{ padding: "4% 0 4%" }}
      >
        <div className="neoBorder bg-primary p-4">
          <h1>This Week at Seal Coast Charter...</h1>
          <p>Posted on: {toFormattedDatetime(props.news.createdOn)}</p>
          <h1 className="mt-5 fw-bold">{props.news.title}</h1>

          <ReactMarkdown
            className="markdown"
            components={{
              p: ({ node, ...props }) => <p className="ms-5" {...props} />,
              h3: ({ node, ...props }) => (
                <h3 className="mt-3 fw-semibold" {...props} />
              ),
              img: ({ node, ...props }) => (
                <img className="border-thin" {...props} />
              ),
            }}
          >
            {props.news.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
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
      bodyStyle: { backgroundColor: "#a0d8ea" },
    },
  };
}
