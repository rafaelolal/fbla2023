import Link from "next/link";

export default function HelpNavbar() {
  return (
    <>
    <div className="container-fluid ">
      <div className="row justify-content-center my-4">
        
          <Link
            href="help?page=howToGuide"
            className="btn eventBtn text-center fs-5 mx-3"
          >
            How to Use Site
          </Link>
          <Link
            href="help?page=howWasItMade"
            className="btn eventBtn text-center fs-5 mx-3"
          >
            How was it Made
          </Link>
        
      </div>
      </div>
    </>
  );
}
