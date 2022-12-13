import { useState } from "react";
import DashboardNavbar from "../components/dashboard/navbar";
import DashboardHome from "../components/dashboard/home";
import DashboardStudents from "../components/dashboard/students";
import DashboardEvents from "../components/dashboard/events";

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState("Home");

  return (
    <>
      <DashboardNavbar setCurrentPage={setCurrentPage} />
      {currentPage == "Home" ? <DashboardHome /> : null}
      {currentPage == "Events" ? <DashboardEvents /> : null}
      {currentPage == "Students" ? <DashboardStudents /> : null}
    </>
  );
}
