import { XMLParser, XMLBuilder } from "fast-xml-parser";

import answerTemplate from "../templates/answer";
import questionTemplate from "../templates/question";
import quizTemplate from "../templates/quiz";

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
  if (answers.length === 0 || questionName === "" || questionText === "")
    return;
  const objAnswers = answers.map((a) => convertAnswerToObj(a));

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

export const createXMLQuiz = (questions) => {
  const parser = new XMLParser({
    cdataPropName: "__cdata",
    preserveOrder: true,
    ignoreAttributes: false,
  });
  const obj = parser.parse(quizTemplate);

  const objQuestions = questions.map((q) => createXMLQuestion(q));

  obj[1].quiz.push(...objQuestions);

  const builder = new XMLBuilder({
    cdataPropName: "__cdata",
    preserveOrder: true,
    ignoreAttributes: false,
    format: true,
  });

  const xml = builder.build(obj);

  //console.log(obj);
  //console.log(xml);
  return xml;
};
