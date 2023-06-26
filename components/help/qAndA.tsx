import { MutableRefObject, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { questions } from "../../helpers";

export default function QNA() {
  const searchRef = useRef() as MutableRefObject<HTMLInputElement>;
  const [currentQuestion, setCurrentQuestion] = useState<{
    question: string;
    answer: string;
  } | null>(null);

  function getTopAnswer() {
    const words = searchRef.current.value.toLowerCase().split(" ");

    for (const question of questions) {
      question.points = 0;
    }

    for (const word of words) {
      for (const question of questions) {
        if (question.question.toLowerCase().split(" ").includes(word)) {
          question.points += 5;
        } else if (question.answer.toLowerCase().split(" ").includes(word)) {
          question.points += 1;
        }
      }
    }

    questions.sort((a, b) => {
      if (a.points > b.points) {
        return -1;
      } else if (b.points > a.points) {
        return 1;
      }
      return 0;
    });

    if ((words.length == 1 && words[0] == "") || questions[0].points == 0) {
      setCurrentQuestion(null);
      return;
    }

    const selectedQuestion = questions[0];

    const currentQuestion = { question: "", answer: "" };
    for (const word of selectedQuestion.question.split(" ")) {
      currentQuestion.question += words.includes(word.toLowerCase())
        ? `**${word}** `
        : word + " ";
    }
    for (const word of selectedQuestion.answer.split(" ")) {
      currentQuestion.answer += words.includes(word.toLowerCase())
        ? `**${word}** `
        : word + " ";
    }

    setCurrentQuestion(currentQuestion);
  }

  return (
    <>
      <div className="bg-white p-5 h-100">
        <div className="col-lg-6 col-11 mx-auto">
          <h2>Questions and Answers</h2>
          <div className="mt-4 w-100 mx-auto">
            <div className="mt-3 mb-4">
              {currentQuestion ? (
                <div>
                  <div className="bg-quaternary text-light b-radius-normal p-3">
                    <ReactMarkdown className="markdown">
                      {currentQuestion.question}
                    </ReactMarkdown>
                    <ReactMarkdown className="markdown">
                      {currentQuestion.answer}
                    </ReactMarkdown>
                  </div>
                </div>
              ) : (
                "No search item yet"
              )}
            </div>
            <div
              className="form-floating mb-4 border-thin "
              style={{ borderRadius: "30px" }}
            >
              <input
                type="text"
                className="form-control border-0 ps-4"
                id="search"
                placeholder="Keywords"
                style={{ borderRadius: "30px" }}
                ref={searchRef}
                onChange={getTopAnswer}
              />
              <label className="ps-4" htmlFor="search">
                Search
              </label>
            </div>

            <div
              className="accordion"
              style={{ borderRadius: "30px" }}
              id="accordionExample"
            >
              {questions.map((question, i) => (
                <div
                  key={i}
                  className="accordion-item my-3 b-radius-normal"
                  style={{ border: "3px solid black" }}
                >
                  <h2 className="accordion-header border-0" id={`heading${i}`}>
                    <button
                      className="accordion-button collapsed b-radius-normal"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${i}`}
                      aria-controls={`collapse${i}`}
                    >
                      {question.question}
                    </button>
                  </h2>

                  <div
                    id={`collapse${i}`}
                    className="accordion-collapse collapse border-0"
                    aria-labelledby={`heading${i}`}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">{question.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
