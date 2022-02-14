import RichText from "../components/RichText";

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
    <div style={{ border: "2px solid black" }}>
      <input
        type="text"
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
      {questions[index].answers.map((a, i) => {
        return (
          <div key={i}>
            <input
              onChange={(event) => onChange(event, i)}
              value={questions[index].answers[i]}
              placeholder={"Answer"}
            />
            {questions[index].answers.length !== 1 && (
              <button onClick={() => removeAnswer(i)}>Remove</button>
            )}
            {questions[index].answers.length - 1 === i && (
              <button onClick={addAnswer}>Add</button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Question;
