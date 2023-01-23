import { useState } from "react";
import { useAppContext } from "../context/state";
import ForbiddenPage from "../components/forbiddenPage";
import DashboardNavbar from "../components/dashboard/navbar";
import DashboardHome from "../components/dashboard/home";
import DashboardStudentList from "../components/dashboard/students/student-list";
import DashboardEvents from "../components/dashboard/events/events";

export default function DashboardPage() {
  const { user, isA } = useAppContext();
  const [currentPage, setCurrentPage] = useState("Home");

  if (!user) {
    return <p>Loading...</p>;
  }

  if (!isA) {
    return <ForbiddenPage />;
  }

  return (
    <>
      <DashboardNavbar setCurrentPage={setCurrentPage} />
      {currentPage == "Home" && <DashboardHome />}
      {currentPage == "Events" && <DashboardEvents />}
      {currentPage == "Students" && <DashboardStudentList />}
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      bodyStyle: { backgroundColor: "white" },
    },
  };
}
