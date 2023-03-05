import Link from "next/link";

export default function Footer(props: any) {
  return (
    <>
      {props.isLB == true && (
        <img
          className=""
          style={{
            objectFit: "cover",
            height: "75vh",
            width: "100%",
            objectPosition: "center bottom",
            overflow: "hidden",
          }}
          src="/images/leaderboard/bottomOfLeaderboard.svg"
        ></img>
      )}

      <div
        className="bg-primary overflow-hidden text-light py-5"
        style={{ borderTop: "solid 4px #000" }}
      >
        <div className="row row-cols-1 row-cols-md-2 justify-content-center text-dark">
          <div className="col-12 col-md-auto text-center mb-5 mb-md-0">
            <div className="row row-cols-1 justify-content-center">
              <div className="col-auto">
                <img
                  className="d-block mx-auto mb-1"
                  src="/images/logo.svg"
                  height="130px"
                  width="130px"
                  alt="Seal Coast Charter School Logo"
                  style={{ objectFit: "contain" }}
                />
                <h3>Seal Coast</h3>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-9 col-lg-7">
            <div className="row row-cols-1 row-cols-md-3">
              <div className="col text-break">
                <h5 className="fw-bolder text-center ">Reach Out to Us!</h5>

                <div className="mx-auto" style={{ width: "fit-content" }}>
                  <h6 className="text-center fw-normal">
                    <span className="fw-semibold">134 West Minister st,</span>{" "}
                    Scotch Plains, NJ
                  </h6>

                  <h6 className="text-center fw-normal">1 (199) 838-2727</h6>

                  <h6 className="text-center fw-normal">office@scc.edu</h6>
                </div>
              </div>

              <div className="col text-break mt-5 mt-md-0">
                <h5 className="fw-bolder text-center">About Us!</h5>
                <h6 className="text-center fw-normal ">Our Policies</h6>
                <h6 className="text-center fw-normal">
                  Official District Handbook 2023
                </h6>
                <h6 className="text-center fw-normal">Board of Directors</h6>
              </div>

              <div className="col text-break mt-5 mt-md-0">
                <h5 className="fw-bolder text-center">QuickLinks</h5>
                <Link
                  className="text-center nav-link d-block fw-normal"
                  href="/help?page=howToGuide"
                >
                  How do you use this Site
                </Link>

                <Link
                  className="text-center nav-link d-block fw-normal"
                  href="/help?page=howWasItMade"
                >
                  How the website was made
                </Link>

                <Link
                  className="text-center nav-link d-block fw-normal"
                  href="/news"
                >
                  News
                </Link>

                <Link
                  className="text-center nav-link d-block fw-normal"
                  href="/help"
                >
                  Copyright and Resources
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-lightTertiary p-2 text-center">
        Seal Coast Charter is accredited by the Learning Commission.
      </div>
    </>
  );
}
