import HelpNavbar from "../components/help/navbar";
import HelpHowItsMade from "../components/help/made";
import HelpHowToGuide from "../components/help/guide";
import Footer from "../components/layout/footer";
import QNA from "../components/help/qAndA";
import { useRouter } from "next/router";

export default function HelpPage() {
  const router = useRouter();

  const page = router.query.page;

  return (
    <>
      <div className="row justify-content-around my-5">
        <div className="col-4 p-0 neoBorder b-radius-normal mt-5">
          <QNA />
        </div>
        <div className="col-7 mt-5">
          <HelpNavbar />
          <div
            className="neoBorder pt-3"
            style={{ backgroundColor: "#bbe4f2" }}
          >
            {(page == "howToGuide" || page === undefined) && <HelpHowToGuide />}
            {page == "howWasItMade" && <HelpHowItsMade />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      bodyStyle: { backgroundColor: "#ffffff" },
    },
  };
}
