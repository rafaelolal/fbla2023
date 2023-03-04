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
      <HelpNavbar />
      {page == "howToGuide" && <HelpHowToGuide />}
      {page == "howWasItMade" && <HelpHowItsMade />}

      <QNA />
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      bodyStyle: { backgroundColor: "#bbe4f2" },
    },
  };
}
