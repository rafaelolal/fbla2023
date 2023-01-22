export default function HelpHowItsMade() {
  return (
    <>
      <div className="container">
        <div className="row m-5">
          <div className="col-4 text-end">
            <img
              src="/images/help page/help_image_1.svg"
              width="300px"
              height="auto"
            ></img>
          </div>
          <div className="col-3 text-start">
            <h1 className="fw-semibold text-center">Technologies Used</h1>
            <h6 className="text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five
            </h6>
          </div>

          <div className="col-4 text-start">
            <img
              src="/images/help page/arrow.svg"
              width="280px"
              height="auto"
            ></img>
          </div>
        </div>

        <div className="row m-5">
          <div className="col-4 text-end">
            <img
              style={{ transform: "scaleX(-1)" }}
              src="/images/help page/arrow.svg"
              width="280px"
              height="auto"
            ></img>
          </div>

          <div className="col-3 text-center">
            <h1 className="fw-semibold text-center">Art Tools</h1>
            <h6 className="text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries,
            </h6>
          </div>
          <div className="col-4 text-start">
            <img
              src="/images/help page/help_image_6.svg"
              width="300px"
              height="auto"
            ></img>
          </div>
        </div>

        <div className="row m-5">
          <div className="col-4 text-end">
            <img
              src="/images/help page/help_image_3.svg"
              width="300px"
              height="auto"
            ></img>
          </div>
          <div className="col-3 text-center">
            <h1 className="fw-semibold text-center">Styling Tools</h1>
            <h6 className="text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five
            </h6>
          </div>
        </div>
      </div>
    </>
  );
}
