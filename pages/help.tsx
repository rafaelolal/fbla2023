import ChatBot from "../components/help/chatBot";
import Footer from "../components/layout/footer";
import QNA from "../components/help/qAndA";

export default function HelpPage() {
  return (
    <>
      <QNA />
      <ChatBot />
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      bodyStyle: { backgroundColor: "#ffffff" },
    },
  };
}
