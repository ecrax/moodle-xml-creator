import "./App.css";
import { useState } from "react";

import { createXMLQuiz } from "./util/xml";
import Question from "./components/Question";
import { downloadFile } from "./util/downloadFile";

import { FilledButton, OutlineButton } from "./components/Button";

const App = () => {
  const [xml, setXml] = useState("");

  const [questions, setQuestions] = useState([
    { questionName: "", questionText: "", answers: [""] },
  ]);

  const removeQuestion = (i) => {
    const _questions = [...questions];
    _questions.splice(i, 1);
    setQuestions(_questions);
  };
  const addQuestion = () => {
    const _questions = [...questions];
    _questions.push({ questionName: "", questionText: "", answers: [""] });
    setQuestions(_questions);
  };

  return (
    <main className="max-w-6xl m-auto">
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
                <OutlineButton onClick={addQuestion} icon="add">
                  Add
                </OutlineButton>
              )}
            </div>
          );
        })}
      </div>
      <FilledButton
        onClick={() => {
          setXml(createXMLQuiz(questions));
        }}
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
      <pre>{xml}</pre>
    </main>
  );
};

export default App;
