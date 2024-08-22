import Answers from "./Answers";
import { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Button from "react-bootstrap/Button";
import { HorizontalRule } from "@mui/icons-material";

const renderTime = ({ remainingTime }) => {
  return (
    <div className="timerq">
      <div className="valueq">{remainingTime}</div>
    </div>
  );
};

const getPlusMinusQuestion = () => {
  //get the question
  let num1 = Math.floor(Math.random() * 100);
  let num2 = Math.floor(Math.random() * 100);
  let que = "";
  let ans = "";
  if (Math.random() < 0.5) {
    que = `${num1}  +  ${num2} `;
    ans = num1 + num2;
  } else {
    if (num1 > num2) {
      que = `${num1}  -  ${num2} `;
      ans = num1 - num2;
    } else {
      que = `${num2}  -  ${num1}`;
      ans = num2 - num1;
    }
  }
  let extraAnswers = [
    `${ans + 10}`,
    `${ans - 10}`,
    `${ans + 20}`,
    `${ans - 20}`,
    `${ans - 30}`,
    `${ans + 30}`,
  ];
  extraAnswers.sort(() => Math.random() - 0.5);
  // take only 3 and add the correct answer

  let allAnswersMinus = extraAnswers.slice(1, 4);
  allAnswersMinus.push(`${ans}`);

  let allAnswers = allAnswersMinus.map((num) => {
    let absNum = Math.abs(num);
    return `${absNum}`;
  });
  return { que, ans, allAnswers };
};

const getMultiplyQuestion = () => {
  function removeDuplicates(arr) {
    return [...new Set(arr)];
  }
  let num1 = Math.floor(Math.random() * 101);
  let num2 = Math.floor(Math.random() * 11);
  if (num2 <= 0) num2 = 1;
  num1 = Math.floor((num1 + 0.1) / num2);
  let que = "";
  let ans;
  que = `${num1}  x  ${num2}`;
  ans = num1 * num2;
  let extraAnswers = [];
  extraAnswers.push(ans - num1);
  extraAnswers.push(ans - num2);
  extraAnswers.push(ans - num1 + 1);
  extraAnswers.push(ans - num2 + 1);
  extraAnswers.push(ans + num1);
  extraAnswers.push(ans + num2);
  extraAnswers.push(ans + num1 + 1);
  extraAnswers.push(ans + num2 + 1);
  extraAnswers.push(ans - 10);
  extraAnswers.push(ans - 20);
  extraAnswers.push(ans + 10);
  extraAnswers.push(ans + 20);
  extraAnswers.push(ans - num1 - num1);
  extraAnswers.push(ans - num2 - num2);
  extraAnswers.push(ans - num1 - num2 + 1);
  extraAnswers.push(ans - num2 - num1 + 1);
  extraAnswers.push(ans + num1 + num1);
  extraAnswers.push(ans + num2 + num2);
  let posAns = extraAnswers.filter((num) => num >= 0 && num <= 100);
  let goodAns = removeDuplicates(posAns);
  goodAns.sort(() => Math.random() - 0.5);
  // take only 3 and add the correct answer
  let allAnswers = goodAns.slice(0, 3);
  ans = `${num1 * num2}`;
  allAnswers.push(`${ans}`);
  return { que, ans, allAnswers };
};

const getDivideQuestion = () => {
  let num1 = Math.floor(Math.random() * 101);
  let num2 = Math.floor(Math.random() * 11);
  if (num2 <= 0) num2 = 1;
  num1 = Math.floor((num1 + 0.1) / num2);
  let que = "";
  que = `${num2 * num1}  ÷  ${num2}`;
  let ans = num1;
  let extraAnswers = [
    ans - 1,
    ans + 1,
    ans - 2,
    ans + 2,
    ans - 3,
    ans + 3,
    ans - 4,
    ans + 4,
    ans - 5,
  ].filter((num) => num >= 0 && num <= 100);
  extraAnswers.sort(() => Math.random() - 0.5);
  // take only 3 and add the correct answer
  let allAnswers = extraAnswers.slice(0, 3);
  allAnswers.push(`${ans}`);
  ans = `${num1}`;
  return { que, ans, allAnswers };
};

export default function MathQuestion({
  index,
  onSelectAnswer,
  onAnswerSelected,
  onSkipAnswer,
}) {
  let que = "";
  let ans = "";
  let allAnswers = [];
  let currQue;
  if (Math.random() < 0.35) {
    currQue = getPlusMinusQuestion();
  } else {
    if (Math.random() < 0.5) {
      currQue = getMultiplyQuestion();
    } else {
      currQue = getDivideQuestion();
    }
  }
  que = currQue.que;
  ans = currQue.ans;
  allAnswers = currQue.allAnswers;
  console.log("que = > ", que, " --------- ans ===  ", ans);
  console.log("all Ans = ", allAnswers);
  const [currAnswer, setAnswer] = useState({
    ques: que,
    correctAns: `${ans}`,
    selectedAnswer: "",
    isCorrect: null,
  });
  let timer = 25000;
  function handleSelectAnswer(answer) {
    setAnswer((ans) => ({
      ...ans,
      selectedAnswer: answer,
      isCorrect: currAnswer.correctAns === answer,
    }));
    console.log("In handle select ans ---", currAnswer);
  }

  const children = ({ remainingTime }) => (
    <div role="timer" color="#F7B801">
      {remainingTime}
    </div>
  );

  console.log("outsie of handle funstion", currAnswer);
  let answerState = "";
  if (currAnswer.selectedAnswer && currAnswer.isCorrect !== null) {
    answerState = currAnswer.isCorrect ? "correct" : "wrong";
  } else if (currAnswer.selectedAnswer) {
    answerState = "answered";
  }

  function handleOnNextQuestion() {
    console.log("sending call to on select anser");
    onSelectAnswer(currAnswer);
  }
  return (
    <>
      <div id="question">
        <div id="Style-left">
          <div class="Qstart">
            <CountdownCircleTimer
              isPlaying={currAnswer.selectedAnswer === ""}
              duration={timer / 1000}
              colors="#F7B801"
              size={100}
              onComplete={
                currAnswer.selectedAnswer === "" ? onSkipAnswer : null
              }
            >
                        {renderTime}

              {/* {({ remainingTime, color }) => (
                <span style={{ color }}>{remainingTime}</span>
              )}{" "} */}
            </CountdownCircleTimer>
          </div>
          <div class="Qtext">
            {currAnswer.ques}
          </div>
          <div class="Qstart">
            {}
          </div>
        </div>
        <div>
          <Answers
            answers={allAnswers}
            selectedAnswer={currAnswer.selectedAnswer}
            corrAns={currAnswer.correctAns}
            onSelect={handleSelectAnswer}
          />
        </div>
        <div>
          <Button variant="primary" size="lg" onClick={handleOnNextQuestion}>
            {" "}
            Next Question
          </Button>
        </div>
      </div>
    </>
  );
}
