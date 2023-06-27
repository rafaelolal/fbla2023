import Link from "next/link";

export default function DashboardNavbar() {
  return (
    <div className="row">
      <nav className="navbar navbar-expand bg-primary ">
        <div className="container-fluid justify-content-center">
          <div className="navbar-nav">
            <Link className="nav-link" href="/dashboard?page=home">
              Home
            </Link>

            <Link className="nav-link" href="/dashboard?page=reports">
              Reports
            </Link>

            <Link className="nav-link" href="/dashboard?page=events">
              Events
            </Link>

            <Link className="nav-link" href="/dashboard?page=students">
              Students
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
