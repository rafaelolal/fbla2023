import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function RallyPage(props: {
  names: {
    pk: string;
    firstName: string;
    middleName: string;
    lastName: string;
  }[];
}) {
  console.log({ names: props.names });

  useEffect(() => {
    const items = props.names
      .filter((name) => name.firstName !== null)
      .map((name) => `${name.firstName} ${name.lastName.slice(0, 1)}.`);
    const doors = document.querySelectorAll(".door");

    document.querySelector("#spinner").addEventListener("click", spin);
    document.querySelector("#reseter").addEventListener("click", init);

    function init(firstInit = true, groups = 1, duration = 1) {
      for (const door of doors) {
        if (firstInit) {
          door.dataset.spinned = "0";
        } else if (door.dataset.spinned === "1") {
          return;
        }

        const boxes = door.querySelector(".boxes");
        const boxesClone = boxes.cloneNode(false);
        const pool = ["❓"];

        if (!firstInit) {
          const arr = [];
          for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
            arr.push(...items);
          }
          pool.push(...shuffle(arr));

          boxesClone.addEventListener(
            "transitionstart",
            function () {
              door.dataset.spinned = "1";
              this.querySelectorAll(".box").forEach((box) => {
                box.style.filter = "blur(1px)";
              });
            },
            { once: true }
          );

          boxesClone.addEventListener(
            "transitionend",
            function () {
              this.querySelectorAll(".box").forEach((box, index) => {
                box.style.filter = "blur(0)";
                if (index > 0) this.removeChild(box);
              });
            },
            { once: true }
          );
        }

        for (let i = pool.length - 1; i >= 0; i--) {
          const box = document.createElement("div");
          box.classList.add("box");
          box.style.width = door.clientWidth + "px";
          box.style.height = door.clientHeight + "px";
          box.textContent = pool[i];
          boxesClone.appendChild(box);
        }
        boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
        boxesClone.style.transform = `translateY(-${
          door.clientHeight * (pool.length - 1)
        }px)`;
        door.replaceChild(boxesClone, boxes);
      }
    }

    async function spin() {
      init(false, 1, 2);

      for (const door of doors) {
        const boxes = door.querySelector(".boxes");
        const duration = parseInt(boxes.style.transitionDuration);
        boxes.style.transform = "translateY(0)";
        await new Promise((resolve) => setTimeout(resolve, duration * 100));
      }
    }

    function shuffle([...arr]) {
      let m = arr.length;
      while (m) {
        const i = Math.floor(Math.random() * m--);
        [arr[m], arr[i]] = [arr[i], arr[m]];
      }
      return arr;
    }

    init();
  });

  function handleGivePrize() {
    // axios
    //   .post("http://127.0.0.1:8000/api/prize/create/", {
    //     student: 100,
    //     type: "Spirit",
    //   })
    //   .then(() => {
    //     toast.success("Prize given successfully");
    //   })
    //   .catch((error) => {
    //     throw error;
    //   });
    toast.success("Prize given successfully");
  }

  return (
    <>
      <div className="d-flex flex-column">
        <div
          className="position-relative mx-auto"
          style={{ height: "fit-content", width: "fit-content" }}
        >
          <img
            className="mx-auto rally"
            src="/images/slot page/slot machine.svg"
          ></img>

          <div
            className="door d-flex actual-door"
            style={{
              position: "absolute",
              top: "40.5%",
              left: "17.5%",
              width: "54%",
              height: "27%",
              zIndex: "-1",
            }}
          >
            <div className="boxes mx-auto my-auto"></div>
          </div>

          <div className="door visually-hidden">
            <div className="boxes"></div>
          </div>
        </div>

        {/* <div
        className="fixed-bottom"
        style={{
          width: "100%",
          height: "8rem",
          backgroundColor: "#e6f9ff",
          borderTop: "solid 5px #000000",
        }}
      ></div> */}

        <div className="dashboard row">
          <div className="rallySpinBtn d-inline-block" id="spinner"></div>
          <div className="rallyResetBtn d-inline-block" id="reseter"></div>
          <div
            className="rallyRewardBtn d-inline-block"
            id="rewarder"
            onClick={handleGivePrize}
          ></div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const response = await axios
    .get("http://127.0.0.1:8000/api/students/rally/")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });

  return {
    props: {
      names: response.data,
      bodyStyle: { backgroundColor: "#fff" },
    },
  };
}
