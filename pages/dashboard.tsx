import { useAppContext } from "../context/state";
import ForbiddenPage from "../components/forbiddenPage";
import DashboardNavbar from "../components/dashboard/navbar";
import DashboardHome from "../components/dashboard/home";
import DashboardStudentList from "../components/dashboard/students/student-list";
import DashboardEvents from "../components/dashboard/events/events";
import DashboardReports from "../components/dashboard/reports";
import { useRouter } from "next/router";

export default function DashboardPage() {
  const { user, isA } = useAppContext();
  const router = useRouter();

  const page = router.query.page;

  if (!user) {
    return <p>Loading...</p>;
  }

  if (!isA) {
    return <ForbiddenPage />;
  }

  return (
    <>
      <DashboardNavbar />
      {(page == "home" || page === undefined) && <DashboardHome />}
      {page == "reports" && <DashboardReports />}
      {page == "events" && <DashboardEvents />}
      {page == "students" && <DashboardStudentList />}
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
