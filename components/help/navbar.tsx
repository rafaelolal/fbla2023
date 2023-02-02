import { useRouter } from "next/router";

export default function HelpNavbar(props: {
  setCurrentPage: (page: string) => void;
}) {
  const router = useRouter();

  function changeToHowToGuide() {
    props.setCurrentPage("How to Guide");
    router.push(
      { pathname: "help", query: { page: "howToGuide" } },
      undefined,
      { shallow: true }
    );
  }

  function changeToHowWasItMade() {
    props.setCurrentPage("How was it Made");
    router.push(
      { pathname: "help", query: { page: "howWasItMade" } },
      undefined,
      { shallow: true }
    );
  }

  return (
    <nav className="navbar navbar-expand bg-light ">
      <div className="container-fluid justify-content-center">
        <div className="navbar-nav">
          <a className="nav-link text-center" onClick={changeToHowToGuide}>
            How to Guide
          </a>
          <a className="nav-link text-center" onClick={changeToHowWasItMade}>
            How was it Made
          </a>
        </div>
      </div>
    </nav>
  );
}
