import { useEffect } from "react";

export default function RallyPage() {
  useEffect(() => {
    const items = ["RAfael", "DJ", "Breno"];
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

  return (
    <>
    <div className="d-flex flex-column">
      <div className="position-relative mx-auto" style={{height: "fit-content", width: "fit-content"}}>
        <img
          className="mx-auto rally"
          
          src="/images/slot page/slot machine.svg"
        ></img>

        <div
        className="door d-flex"
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
 <div className="">

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

      

      

      <div className="dashboard bg-primary d-flex" style={{borderTop: "4px solid #000", alignSelf: "stretch", padding: "1% 2% 5%"}}>
        
        <div  className="rallySpinBtn d-inline-block" id="spinner"></ div>
        <div className="rallyResetBtn d-inline-block" id="reseter"></div>
        <div className="rallyRewardBtn d-inline-block" id="rewarder"></div>
        
      </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      bodyStyle: { backgroundColor: "#fff" },
    },
  };
}

