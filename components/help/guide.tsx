import { MutableRefObject, useRef } from "react";
import { useAppContext } from "../../context/state";
export default function HelpHowToGuide() {
  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center my-5 ">
          <div className="col-3 text-end d-none d-lg-block my-auto">
            <img
              style={{ transform: "scaleX(-1)" }}
              src="/images/help page/arrow.svg"
              width="60%"
              height="auto"
            ></img>
          </div>

          <div className="col-3 text-center my-auto">
            <h1 className="fw-semibold text-center">Join Events</h1>
            <h6 className="text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer
            </h6>
          </div>
          <div className="col-4 text-center">
            <img
              src="/images/help page/help_image_4.svg"
              width="100%"
              height="auto"
            ></img>
          </div>
        </div>
        <div className="row justify-content-center my-5 ">
          <div className="col-4 text-center">
            <img
              src="/images/help page/help_image_2.svg"
              width="100%"
              height="auto"
            ></img>
          </div>

          <div className="col-3 text-center my-auto">
            <h1 className="fw-semibold text-center">Collect Points</h1>
            <h6 className="text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to
            </h6>
          </div>

          <div className="col-3 text-start d-none d-lg-block my-auto">
            <img
              src="/images/help page/arrow.svg"
              width="60%"
              height="auto"
            ></img>
          </div>
        </div>

        <div className="row justify-content-center my-5 ">
          <div className="col-xs-0 col-md-4 "></div>
          <div className="col-3 text-center my-auto">
            <h1 className="fw-semibold text-center">Win Prizes</h1>
            <h6 className="text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a
            </h6>
          </div>

          <div className="col-4 text-center">
            <img
              src="/images/help page/help_image_5.svg"
              width="100%"
              height="auto"
            ></img>
          </div>
        </div>
      </div>
    </>
  );
}
