import "./App.css";
import React, { useState } from "react";

import { createXMLQuiz } from "./util/xml";
import Question from "./components/Question";

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
    <div>
      {questions.map((question, i) => {
        return (
          <div key={i}>
            <Question
              questions={questions}
              setQuestions={setQuestions}
              index={i}
            />
            {questions.length !== 1 && (
              <button onClick={() => removeQuestion(i)}>Remove</button>
            )}
            {questions.length - 1 === i && (
              <button onClick={addQuestion}>Add</button>
            )}
          </div>
        );
      })}
      <button
        onClick={() => {
          setXml(createXMLQuiz(questions));
        }}
      >
        Convert to xml
      </button>
      <pre>{xml}</pre>
    </div>
  );
};

export default App;
