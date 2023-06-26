import HelpHowToGuide from "../components/help/guide";
import Footer from "../components/layout/footer";
import QNA from "../components/help/qAndA";

export default function HelpPage() {
  return (
    <>
      <QNA />
      <HelpHowToGuide />
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
