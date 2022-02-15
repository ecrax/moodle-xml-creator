import "./App.css";
import { useState } from "react";

import { createXMLQuiz } from "./util/xml";
import Question from "./components/Question";
import { downloadFile } from "./util/downloadFile";

import { FilledButton, OutlineButton } from "./components/Button";

const App = () => {
  const [xml, setXml] = useState("");

  const [questions, setQuestions] = useState([
    {
      questionName: "",
      questionText: "",
      answers: [{ answerText: "", fraction: 100 }],
    },
  ]);

  const removeQuestion = (i) => {
    const _questions = [...questions];
    _questions.splice(i, 1);
    setQuestions(_questions);
  };
  const addQuestion = () => {
    const _questions = [...questions];
    _questions.push({
      questionName: "",
      questionText: "",
      answers: [{ answerText: "", fraction: 0 }],
    });
    setQuestions(_questions);
  };

  return (
    <div className="max-w-6xl m-auto">
      <main className="px-8 py-16">
        <h1 className="text-2xl">Moodle XML Converter</h1>

        <div className="pb-4">
          {questions.map((_question, i) => {
            return (
              <div key={i} className="flex flex-col py-4 border-b-2">
                <Question
                  questions={questions}
                  setQuestions={setQuestions}
                  index={i}
                />
                {questions.length !== 1 && (
                  <OutlineButton onClick={() => removeQuestion(i)} icon="trash">
                    Remove
                  </OutlineButton>
                )}
                {questions.length - 1 === i && (
                  <OutlineButton
                    className="pt-8"
                    onClick={addQuestion}
                    icon="add"
                  >
                    Add
                  </OutlineButton>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex">
          <FilledButton
            onClick={() => {
              setXml(createXMLQuiz(questions));
            }}
            className="mr-2"
          >
            Convert to xml
          </FilledButton>
          {xml !== "" && (
            <FilledButton
              icon="download"
              onClick={() => downloadFile(xml, "moodle-quiz")}
            >
              Download .xml file
            </FilledButton>
          )}
        </div>
        <pre>{xml}</pre>
      </main>
      <footer className="text-center">Leo Kling • © 2022</footer>
    </div>
  );
};

export default App;
