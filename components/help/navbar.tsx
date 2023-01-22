export default function HelpNavbar(props: {
  setCurrentPage: (page: string) => void;
}) {
  return (
    <nav className="navbar navbar-expand-lg bg-light my-5">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#helpNavbar"
          aria-controls="helpNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="helpNavbar">
          <div className="navbar-nav mx-auto">
            <a
              className="nav-link"
              onClick={() => props.setCurrentPage("Home to Guide")}
            >
              How to Guide
            </a>
            <a
              className="nav-link"
              onClick={() => props.setCurrentPage("How was it Made")}
            >
              How was it Made
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
