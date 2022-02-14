import "./App.css";
import React, { useState } from "react";
import RichText from "./components/RichText";
import { XMLParser, XMLBuilder } from "fast-xml-parser";
import beautify from "xml-beautifier";

import answerTemplate from "./templates/answer";
import questionTemplate from "./templates/question";
import quizTemplate from "./templates/quiz";

const convertAnswerToObj = (sAnswer) => {
  if (sAnswer === "") return;

  const parser = new XMLParser({
    cdataPropName: "__cdata",
    preserveOrder: true,
  });
  const obj = parser.parse(answerTemplate);
  const [one] = obj;
  const { answer } = one;

  //obj.answer.text.__cdata = answer;
  //obj[0].answer[0].text[0].__cdata[0]["#text"] = sAnswer;
  answer[0].text[0].__cdata[0]["#text"] = sAnswer;

  const toBeReturned = { answer: answer };

  return toBeReturned;
};

const createXMLQuestion = ({ questionName, questionText, answers }) => {
  const objAnswers = answers.map((a) => convertAnswerToObj(a));
  if (objAnswers.length === 0 || questionName === "" || questionText === "")
    return;

  const parser = new XMLParser({
    cdataPropName: "__cdata",
    preserveOrder: true,
  });
  const obj = parser.parse(questionTemplate);

  //obj.answer.text.__cdata = answer;
  //obj[0].answer[0].text[0].__cdata[0]["#text"] = answer;

  obj[0].question.push(...objAnswers);
  obj[0].question[0].name[0].text[0]["#text"] = questionName;
  obj[0].question[1].questiontext[0].text[0].__cdata[0]["#text"] = questionText;

  const toBeReturned = { question: obj[0].question };

  //console.log(toBeReturned);
  //console.log(toBeReturned);

  return toBeReturned;
};

const createXMLQuiz = (objQuestions) => {
  if (objQuestions.length === 0) return;

  const parser = new XMLParser({
    cdataPropName: "__cdata",
    preserveOrder: true,
  });
  const obj = parser.parse(quizTemplate);

  obj[1].quiz.push(...objQuestions);

  const builder = new XMLBuilder({
    cdataPropName: "__cdata",
    preserveOrder: true,
  });

  const xml = builder.build(obj);

  //console.log(obj);
  console.log(xml);
  //return xml;
};

const App = () => {
  const [questionName, setQuestionName] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [answers, setAnswers] = useState([""]);
  const [xml, setXml] = useState("");

  const onChange = (e, i) => {
    const data = e.target.value;
    const list = [...answers];
    list[i] = data;
    setAnswers(list);
    //console.log(answers);
  };
  const removeAnswer = (i) => {
    let list = [...answers];
    list.splice(i, 1);
    setAnswers(list);
    //console.log(list);
    //console.log(answers);
  };
  const addAnswer = () => {
    setAnswers([...answers, ""]);
  };

  return (
    <div>
      <input
        type="text"
        name="question-name"
        placeholder="Question Name"
        value={questionName}
        onChange={(e) => {
          setQuestionName(e.target.value);
        }}
      />
      <br />
      <RichText
        onChange={(_e, editor) => {
          const data = editor.getData();
          setQuestionText(data);
          //console.log(questionText);
        }}
        placeholder={"Question Text"}
      />
      {answers.map((a, i) => {
        return (
          <div key={i}>
            <input
              onChange={(event) => onChange(event, i)}
              value={answers[i]}
              placeholder={"Answer"}
            />
            {answers.length !== 1 && (
              <button onClick={() => removeAnswer(i)}>Remove</button>
            )}
            {answers.length - 1 === i && (
              <button onClick={addAnswer}>Add</button>
            )}
          </div>
        );
      })}
      <button
        onClick={() => {
          //setXml(
          //  createXMLQuestion({
          //    questionName: questionName,
          //    questionText: questionText,
          //    answers: answers,
          //  })
          //);

          const q = createXMLQuestion({
            questionName: questionName,
            questionText: questionText,
            answers: answers,
          });

          createXMLQuiz([q]);
        }}
      >
        Convert to xml
      </button>
      <pre>{beautify(xml)}</pre>
    </div>
  );
};

export default App;
