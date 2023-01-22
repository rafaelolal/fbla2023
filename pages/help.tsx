import { useState } from "react";
import { useAppContext } from "../context/state";
import ForbiddenPage from "../components/forbiddenPage";
import HelpNavbar from "../components/help/navbar";
import HelpHowToGuide from "../components/help/made";
import HelpHowItsMade from "../components/help/made";

export default function DashboardPage() {
  const { user, isA } = useAppContext();
  const [currentPage, setCurrentPage] = useState("Home to Guide");

  if (!user) {
    return <p>Loading...</p>;
  }

  if (!isA) {
    return <ForbiddenPage />;
  }

  return (
    <>
      <HelpNavbar setCurrentPage={setCurrentPage} />
      {currentPage == "Home to Guide" && <HelpHowToGuide />}
      {currentPage == "How was it Made" && <HelpHowItsMade />}
    </>
  );
}
