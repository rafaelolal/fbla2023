import { useState } from "react";
import HelpNavbar from "../components/help/navbar";
import HelpHowItsMade from "../components/help/made";
import HelpHowToGuide from "../components/help/guide";
import Footer from "../components/layout/footer";
import QNA from "../components/help/qAndA";

export default function HelpPage() {
  const [currentPage, setCurrentPage] = useState("How to Guide");

  return (
    <>
      <HelpNavbar setCurrentPage={setCurrentPage} />
      {currentPage == "How to Guide" && <HelpHowToGuide />}
      {currentPage == "How was it Made" && <HelpHowItsMade />}
      <QNA />
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      bodyStyle: { backgroundColor: "#a0d8ea" },
    },
  };
}
