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
      <div className="bg-white p-5" style={{ borderTop: "solid 4px #000" }}>
        <h2>Questions and Answers</h2>
      </div>
      <div
        style={{
          maxWidth: 500,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="search"
            placeholder="Keywords"
            ref={searchRef}
            onChange={getTopAnswer}
          />
          <label htmlFor="search">Search</label>
        </div>

        {currentQuestion ? (
          <div>
            <ReactMarkdown className="markdown">
              {currentQuestion.question}
            </ReactMarkdown>
            <ReactMarkdown className="markdown">
              {currentQuestion.answer}
            </ReactMarkdown>
          </div>
        ) : (
          "No search item yet"
        )}

        <div className="accordion" id="accordionExample">
          {questions.map((question, i) => (
            <div key={i} className="accordion-item">
              <h2 className="accordion-header" id={`heading${i}`}>
                <button
                  className="accordion-button collapsed"
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
                className="accordion-collapse collapse"
                aria-labelledby={`heading${i}`}
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">{question.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
