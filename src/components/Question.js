import RichText from "../components/RichText";
import { OutlineButton } from "./Button";
import { NumberInput } from "./NumberInput";
import { TextInput } from "./TextInput";

function Question({ questions, setQuestions, index }) {
  const onAnswerTextChange = (e, i) => {
    const data = e.target.value;
    const _questions = [...questions];
    _questions[index].answers[i].answerText = data;
    setQuestions(_questions);
    //console.log(answers);
  };
  const onAnswerFractionChange = (e, i) => {
    const data = e.target.value;
    const _questions = [...questions];
    console.log(_questions);
    _questions[index].answers[i].fraction = data;
    setQuestions(_questions);
    //console.log(answers);
  };
  const removeAnswer = (i) => {
    const _questions = [...questions];
    _questions[index].answers.splice(i, 1);
    setQuestions(_questions);
    //console.log(list);
    //console.log(answers);
  };
  const addAnswer = () => {
    const _questions = [...questions];
    _questions[index].answers.push({ answerText: "", fraction: 0 });
    setQuestions(_questions);
  };

  return (
    <div>
      <div>
        <label htmlFor="question-name" className="text-sm">
          Question Name
        </label>
        <div className="pb-1" />
        <TextInput
          name="question-name"
          placeholder="Question Name"
          value={questions[index].questionName}
          onChange={(e) => {
            const _questions = [...questions];
            _questions[index].questionName = e.target.value;
            setQuestions(_questions);
          }}
        />
      </div>
      <div className="py-2" />
      <div>
        <label htmlFor="" className="text-sm">
          Question Text
        </label>
        <div className="pb-1" />
        <RichText
          onChange={(_e, editor) => {
            const data = editor.getData();

            const _questions = [...questions];
            _questions[index].questionText = data;
            setQuestions(_questions);
            //console.log(questionText);
          }}
          placeholder={"Question Text"}
        />
      </div>
      <div className="py-2" />
      <div>
        <label htmlFor="general-feedback" className="text-sm">
          General Feedback
        </label>
        <div className="pb-1" />
        <TextInput
          name="general-feedback"
          placeholder="General Feedback"
          value={questions[index].generalFeedback}
          onChange={(e) => {
            const _questions = [...questions];
            _questions[index].generalFeedback = e.target.value;
            setQuestions(_questions);
          }}
        />
      </div>
      <div className="py-4 ml-8">
        <div className="pb-2 text-lg">Answers:</div>
        {questions[index].answers.map((a, i) => {
          return (
            <div key={i}>
              <div className="flex items-end pb-2">
                <div className="flex-1">
                  <label htmlFor="answer-text" className="text-sm">
                    Answer
                  </label>
                  <div className="pb-1" />
                  <TextInput
                    onChange={(event) => onAnswerTextChange(event, i)}
                    value={questions[index].answers[i].answerText}
                    placeholder={"Answer"}
                    name="answer-text"
                  />
                </div>
                <div className="ml-2">
                  <label htmlFor="fraction" className="text-sm">
                    Fraction
                  </label>
                  <div className="pb-1" />
                  <NumberInput
                    placeholder="Fraction"
                    min={0}
                    max={100}
                    onChange={(event) => onAnswerFractionChange(event, i)}
                    value={questions[index].answers[i].fraction}
                    name="fraction"
                  />
                </div>
                {questions[index].answers.length !== 1 && (
                  <OutlineButton
                    className="ml-2"
                    icon="trash"
                    onClick={() => removeAnswer(i)}
                  >
                    Remove
                  </OutlineButton>
                )}
              </div>
              {questions[index].answers.length - 1 === i && (
                <OutlineButton icon="add" onClick={addAnswer}>
                  Add
                </OutlineButton>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Question;
