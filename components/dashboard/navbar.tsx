export default function DashboardNavbar(props: {
  setCurrentPage: (page: string) => void;
}) {
  return (
    <nav className="navbar navbar-expand bg-primary ">
      <div className="container-fluid justify-content-center">
        <div className="navbar-nav">
          <a className="nav-link" onClick={() => props.setCurrentPage("Home")}>
            Home
          </a>
          <a
            className="nav-link"
            onClick={() => props.setCurrentPage("Events")}
          >
            Events
          </a>
          <a
            className="nav-link"
            onClick={() => props.setCurrentPage("Students")}
          >
            Students
          </a>
        </div>
      </div>
    </nav>
  );
}
