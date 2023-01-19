export default function RallyPage() {
  return (
    <>
      <div className="d-flex" style={{ height: "80vh", width: "100%" }}>
        <img
          className="mx-auto"
          style={{
            width: "auto",
            height: "100%",
            marginBottom: "8rem",
            objectFit: "contain",
          }}
          src="/images/slot machine.svg"
        ></img>
      </div>
      <div
        className="fixed-bottom"
        style={{
          width: "100%",
          height: "8rem",
          backgroundColor: "#e6f9ff",
          borderTop: "solid 5px #000000",
        }}
      ></div>
    </>
  );
}
