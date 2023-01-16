import Link from "next/link";
import { useAppContext } from "../../context/state";
import { auth } from "../../firebaseConfig";

export default function Navbar() {
  const { user, isA } = useAppContext();

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" href="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" href="/events">
                Events
              </Link>
            </li>

            {user && isA && (
              <li className="nav-item">
                <Link className="nav-link" href="/dashboard">
                  Dashboard
                </Link>
              </li>
            )}

            {!user && (
              <li className="nav-item">
                <Link className="nav-link" href="/signIn">
                  Sign In
                </Link>
              </li>
            )}

            {user && (
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={() => {
                    auth.signOut();
                  }}
                >
                  Sign Out
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
