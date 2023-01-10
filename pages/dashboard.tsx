import { useState } from "react";
import { useAppContext } from "../context/state";
import { isAdmin } from "../prisma/helpers";
import ForbiddenPage from "../components/forbiddenPage";
import DashboardNavbar from "../components/dashboard/navbar";
import DashboardHome from "../components/dashboard/home";
import DashboardStudentList from "../components/dashboard/student-list";
import DashboardEvents from "../components/dashboard/events";

export default function DashboardPage() {
  const { user } = useAppContext();
  const [currentPage, setCurrentPage] = useState("Home");

  if (!user) {
    return <p>Loading...</p>;
  }

  isAdmin(user.uid).then(function (data) {
    if (!data) {
      alert(user.uid);
      return <ForbiddenPage />;
    }
  });

  return (
    <>
      <DashboardNavbar setCurrentPage={setCurrentPage} />
      {currentPage == "Home" && <DashboardHome />}
      {currentPage == "Events" && <DashboardEvents />}
      {currentPage == "Students" && <DashboardStudentList />}
    </>
  );
}
