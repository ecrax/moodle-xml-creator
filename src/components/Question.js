import RichText from "../components/RichText";
import { OutlineButton } from "./Button";
import { TextInput } from "./TextInput";

function Question({ questions, setQuestions, index }) {
  const onChange = (e, i) => {
    const data = e.target.value;
    const _questions = [...questions];
    _questions[index].answers[i] = data;
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
    _questions[index].answers.push("");
    setQuestions(_questions);
  };

  return (
    <div>
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
      <br />
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
      <div className="ml-8">
        Answers:
        {questions[index].answers.map((a, i) => {
          return (
            <div key={i}>
              <div className="flex">
                <TextInput
                  onChange={(event) => onChange(event, i)}
                  value={questions[index].answers[i]}
                  placeholder={"Answer"}
                />
                {questions[index].answers.length !== 1 && (
                  <OutlineButton icon="trash" onClick={() => removeAnswer(i)}>
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
