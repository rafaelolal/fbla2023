import Link from "next/link";
import { useAppContext } from "../../context/state";
import { auth } from "../../firebaseConfig";

export default function Navbar() {
  const { user, isA } = useAppContext();

  return (
    <>
      <nav
        className="navbar fixed-top navbar-expand-lg"
        style={{
          backgroundColor: "#e6f9ff",
          borderBottom: "solid 4px #000000",
        }}
      >
        <div className="container-fluid mx-2">
          <Link className="nav-link fw-bold fs-6 px-2" href="/">
            <img
              className="me-2"
              src="images/logo.svg"
              height="32px"
              width="32px"
              style={{ filter: "brightness(0%)" }}
            ></img>
            Seal Coast
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link fw-bolder fs-5 fc-2" href="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link fw-bolder fs-5 fc-2" href="/events">
                  Events
                </Link>
              </li>

              {user && isA && (
                <li className="nav-item fw-bolder fs-5 fc-2">
                  <Link className="nav-link" href="/dashboard">
                    Dashboard
                  </Link>
                </li>
              )}

              {user && !isA && (
                <li className="nav-item">
                  <Link className="nav-link" href={`/profile/${user.uid}`}>
                    Profile
                  </Link>
                </li>
              )}

              <li className="nav-item">
                <Link className="nav-link fw-bolder fs-5 fc-2" href="">
                  Help
                </Link>
              </li>
            </ul>
          </div>

          {!user && (
            <Link
              className="nav-link signBtn fs-6 mx-3 neoBorder "
              href="/signIn"
            >
              Sign In
            </Link>
          )}

          {user && (
            <a
              className="nav-link signBtn fs-6 mx-3 neoBorder "
              onClick={() => {
                auth.signOut();
              }}
            >
              Sign Out
            </a>
          )}
        </div>
      </nav>
      <div className="my-5"></div>
    </>
  );
}
