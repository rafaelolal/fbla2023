import { useState } from "react";
import HelpNavbar from "../components/help/navbar";
import HelpHowItsMade from "../components/help/made";
import HelpHowToGuide from "../components/help/guide";

export default function HelpPage() {
  const [currentPage, setCurrentPage] = useState("Home to Guide");

  return (
    <>
      <HelpNavbar setCurrentPage={setCurrentPage} />
      {currentPage == "Home to Guide" && <HelpHowToGuide />}
      {currentPage == "How was it Made" && <HelpHowItsMade />}
    </>
  );
}
