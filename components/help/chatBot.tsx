import { Configuration, OpenAIApi } from "openai";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
} from "mdb-react-ui-kit";

const configuration = new Configuration({
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export default function ChatBot() {
  const [showChat, setShowChat] = useState(false);
  const [lastMessage, setLastMessage] = useState("");
  const promptRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const messages = useRef([
    {
      role: "system",
      content:
        "You are a question-and-answer bot for the Seal Coast Charter middle school. Your goal is to concisely answer questions about how to perform specific actions on the website. You are only allowed to answer questions with the answers provided below; otherwise, respond with a friendly message saying you do not know the answer to the question asked. The following sentences are the information you need to know about the website. The website was created to increase student involvement in school events. You can see the time until the next rally on the home page. A rally is the day that the random point winner is selected. On the home page, you see the top and upcoming events with the most participants. You can also see the most recent news from the newsroom. On the events page, you can filter through the school events by keyword search, type, location, points, start date, start time, and duration. Students can join events on the event page, earn points by attending, and redeem those points for prizes. After entering an event, the student can access their profile to see a calendar of missed, participated, and future events. In the student profile, they can also see the prizes they have redeemed, their stats like points, rank, events attended, and events joined, and update their profile or password. Only administrators can create student accounts. On the leaderboard page, students can see how many points they have accumulated and their respective ranks.",
    },
    {
      role: "user",
      content:
        "I am a new student to this website. Please answer my questions in the most concise way possible.",
    },
    { role: "assistant", content: "How can I assist you today?" },
  ]);

  useEffect(() => {
    const chatBox = document.getElementById("chatBox");
    if (chatBox) {
      chatBox.scrollTop = chatBox?.scrollHeight;
    }
  }, [lastMessage]);

  const sendPrompt = () => {
    messages.current.push({ role: "user", content: promptRef.current.value });
    setLastMessage(promptRef.current.value);

    promptRef.current.value = "";

    openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages.current,
      })
      .then((response) =>
        messages.current.push(response.data.choices[0].message)
      )
      .finally(() => {
        setLastMessage("");
      });
  };

  return (
    <>
      {!showChat && (
        <button
          type="button"
          className="btn eventBtnO"
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            padding: "0.3rem 0.7rem 0.6rem",
            zIndex: "100",
          }}
          onClick={() => setShowChat(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chat-dots-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
          </svg>
        </button>
      )}

      {showChat && (
        <MDBCard
          className="bg-primary"
          style={{
            position: "fixed",
            right: "10px",
            bottom: "10px",
            width: "350px",
          }}
        >
          <MDBCardHeader className="d-flex justify-content-between align-items-center p-3">
            <h5 className="mb-0">
              AI Helper{" "}
              <img
                className="mx-2"
                style={{ height: "2rem", width: "auto" }}
                src="/images/yellow fish.svg"
              />
            </h5>

            <button
              className="btn btn-sm btn-tertiary"
              onClick={() => setShowChat(false)}
            >
              Close
            </button>
          </MDBCardHeader>

          <MDBCardBody
            id="chatBox"
            style={{ height: "300px", overflowY: "auto" }}
          >
            {messages.current.slice(2).map((m) => {
              if (m.role == "assistant") {
                return (
                  <div className="d-flex flex-row justify-content-start">
                    <div>
                      <p
                        className="small p-2 ms-3 mb-1 rounded-3"
                        style={{ backgroundColor: "#f5f6f7" }}
                      >
                        {m.content}
                      </p>
                    </div>
                  </div>
                );
              }

              return (
                <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                  <div>
                    <p className="small p-2 me-3 mb-1 rounded-3 bg-primary">
                      {m.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </MDBCardBody>

          <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
            <input
              type="text"
              className="form-control form-control-lg"
              id="exampleFormControlInput1"
              placeholder="Ask a question..."
              ref={promptRef}
            />
            <button
              type="button"
              className="ms-3 btn btn-primary"
              onClick={sendPrompt}
            >
              Send
            </button>
          </MDBCardFooter>
        </MDBCard>
      )}

      {/* <button onClick={myFun}>API TEST</button>
      <div className="container-fluid">
        <div className="row justify-content-center my-5 ">
          <div className="col-12 col-xl-3 text-end d-none d-xl-block my-auto">
            <img
              className="shake"
              src="/images/help page/arrowFlipped.svg"
              width="60%"
              height="auto"
            ></img>
          </div>

          <div className="col-12 col-xl-3 text-center my-auto">
            <h1 className="fw-semibold text-center">Join Events</h1>
            <h6 className="text-center px-3">
              To join an event, make sure you are logged in with the correct
              account. Then, from the home page, you can visit the top events of
              the week; on the events page, you can see all events.
            </h6>
          </div>
          <div className="col-12 col-xl-3 text-center text-xl-start">
            <img
              src="/images/help page/help_image_4.svg"
              className="helpImage"
            ></img>
          </div>
        </div>
        <div className="row justify-content-center my-5 ">
          <div className="col-12 col-xl-3 text-center text-xl-end order-2 order-xl-1">
            <img
              src="/images/help page/help_image_2.svg"
              className="helpImage"
            ></img>
          </div>

          <div className="col-12 col-xl-3 text-center my-auto order-1 order-xl-2">
            <h1 className="fw-semibold text-center">Collect Points</h1>
            <h6 className="text-center px-3">
              When you join an event, it is added to your calender in your
              profile. However, that does not grant you any points. Make sure
              you go to the right location to attend the event and talk with the
              administrators to make sure you were marked as present.
            </h6>
          </div>

          <div className="col-12 col-xl-3 d-none d-xl-block my-auto order-sm-3">
            <img
              className="shake"
              src="/images/help page/arrow.svg"
              width="60%"
              height="auto"
            ></img>
          </div>
        </div>

        <div className="row justify-content-center my-5 ">
          <div className="col-12 col-xl-3 text-end d-none d-xl-block my-auto">
            <img
              className="shake"
              src="/images/help page/arrowFlipped.svg"
              width="60%"
              height="auto"
            ></img>
          </div>
          <div className="col-12 col-xl-3 text-center my-auto">
            <h1 className="fw-semibold text-center">Win Prizes</h1>
            <h6 className="text-center px-3">
              Every quarter we will have a rally. In the rally, a random winner
              is picked. Moreover, the three top scorers of the week will also
              be able to win a School, Food, or Spirit prize.
            </h6>
          </div>

          <div className="col-12 col-xl-3 text-center text-xl-start">
            <img
              src="/images/help page/help_image_5.svg"
              className="helpImage"
            ></img>
          </div>
        </div>
      </div> */}
    </>
  );
}
