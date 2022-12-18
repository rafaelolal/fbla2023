export default function DashboardNavbar(props: {
  setCurrentPage: (page: string) => void;
}) {
  return (
    <nav className="navbar navbar-expand-lg bg-light my-5">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav mx-auto">
            <a
              className="nav-link"
              onClick={() => props.setCurrentPage("Home")}
            >
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
      </div>
    </nav>
  );
}
