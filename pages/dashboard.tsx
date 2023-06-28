import { useAppContext } from "../context/state";
import ForbiddenPage from "../components/forbiddenPage";
import DashboardNavbar from "../components/dashboard/navbar";
import DashboardHome from "../components/dashboard/home";
import DashboardStudentList from "../components/dashboard/students/student-list";
import DashboardEvents from "../components/dashboard/events/events";
import DashboardReports from "../components/dashboard/reports";
import { useRouter } from "next/router";
import DashboardRedemptionList from "../components/dashboard/redemptions/redemption-list";

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
      <div className="container-fluid">
        <DashboardNavbar />
        {(page == "home" || page === undefined) && <DashboardHome />}
        {page == "reports" && <DashboardReports />}
        {page == "events" && <DashboardEvents />}
        {page == "students" && <DashboardStudentList />}
        {page == "redemptions" && <DashboardRedemptionList />}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      bodyStyle: { backgroundColor: "#fff" },
    },
  };
}
