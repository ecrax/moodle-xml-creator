import { XMLParser, XMLBuilder } from "fast-xml-parser";

import answerTemplate from "../templates/answer";
import questionTemplate from "../templates/question";
import quizTemplate from "../templates/quiz";

const convertAnswerToObj = (sAnswer) => {
  const parser = new XMLParser({
    cdataPropName: "__cdata",
    preserveOrder: true,
    attributeNamePrefix: "@_",
    ignoreAttributes: false,
  });
  const obj = parser.parse(answerTemplate);

  obj[0][":@"]["@_fraction"] = sAnswer.fraction;
  obj[0].answer[0].text[0].__cdata[0]["#text"] = sAnswer.answerText;

  return obj[0];
};

const createXMLQuestion = ({ questionName, questionText, answers }) => {
  if (answers.indexOf("") !== -1 || questionName === "" || questionText === "")
    return;
  const objAnswers = answers.map((a) => convertAnswerToObj(a));

  const parser = new XMLParser({
    cdataPropName: "__cdata",
    preserveOrder: true,
    attributeNamePrefix: "@_",
    ignoreAttributes: false,
  });
  const obj = parser.parse(questionTemplate);

  //obj.answer.text.__cdata = answer;
  //obj[0].answer[0].text[0].__cdata[0]["#text"] = answer;

  obj[0].question.push(...objAnswers);
  obj[0].question[0].name[0].text[0]["#text"] = questionName;
  obj[0].question[1].questiontext[0].text[0].__cdata[0]["#text"] = questionText;

  const toBeReturned = {
    ":@": { "@_type": "multichoice" },
    question: obj[0].question,
  };

  //console.log(toBeReturned);
  //console.log(toBeReturned);

  return toBeReturned;
};

export const createXMLQuiz = (questions) => {
  const parser = new XMLParser({
    cdataPropName: "__cdata",
    attributeNamePrefix: "@_",
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
    attributeNamePrefix: "@_",
  });

  const xml = builder.build(!obj[1].quiz[0] ? "" : obj);

  //console.log(obj);
  //console.log(xml);
  return xml;
};
