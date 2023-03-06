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
    <div className="container-fluid" style={{ marginTop: "-1rem"}}>
      <div className="row ">
        <div className="col-12 col-lg-4 p-0" style={{borderRight: "4px solid #000"}}>
          <QNA />
        </div>
        <div className="col-12 col-lg-8 p-0 overflow-hidden" style={{ borderTop: "4px solid #000"}}>
          
          <HelpNavbar />
            <div className="container-fluid h-100" style={{borderTop: "4px solid #000"}}>
          <div
            className="row h-100"
            style={{ backgroundColor: "#bbe4f2", }}
          >
            {(page == "howToGuide" || page === undefined) && <HelpHowToGuide />}
            {page == "howWasItMade" && <HelpHowItsMade />}
          </div>
          </div>
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
