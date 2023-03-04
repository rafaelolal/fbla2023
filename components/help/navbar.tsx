import Link from "next/link";

export default function HelpNavbar() {
  return (
    <nav className="navbar navbar-expand bg-light ">
      <div className="container-fluid justify-content-center">
        <div className="navbar-nav">
          <Link href="help?page=howToGuide" className="nav-link text-center">
            How to Guide
          </Link>
          <Link href="help?page=howWasItMade" className="nav-link text-center">
            How was it Made
          </Link>
        </div>
      </div>
    </nav>
  );
}
