import Link from "next/link";

export default function HelpNavbar() {
  return (
    <>
      <div className="container-fluid justify-content-center">
        <div className="">
          <Link
            href="help?page=howToGuide"
            className="btn eventBtnLB text-center"
          >
            How to Guide
          </Link>
          <Link
            href="help?page=howWasItMade"
            className="btn eventBtnLB text-center"
          >
            How was it Made
          </Link>
        </div>
      </div>
    </>
  );
}
