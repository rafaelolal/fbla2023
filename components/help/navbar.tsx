export default function HelpNavbar(props: {
  setCurrentPage: (page: string) => void;
}) {
  return (
    <nav className="navbar navbar-expand bg-light ">
      <div className="container-fluid justify-content-center">
        <div className="navbar-nav">
          <a
            className="nav-link text-center"
            onClick={() => props.setCurrentPage("Home to Guide")}
          >
            How to Guide
          </a>
          <a
            className="nav-link text-center"
            onClick={() => props.setCurrentPage("How was it Made")}
          >
            How was it Made
          </a>
        </div>
      </div>
    </nav>
  );
}
