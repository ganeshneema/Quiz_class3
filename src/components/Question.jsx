import Answers from "./Answers";
import { useState } from "react";
import QUESTIONS from '../questions.js';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

export default function Question({
  index,
  onSelectAnswer,
  onSkipAnswer
}) {

  const [answer, setAnswer] = useState({selectedAnswer:'', isCorrect: null});
  let timer = 10000;
  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer : answer,
      isCorrect : null
    });
    if(answer.selectedAnswer) {
      timer =1000;
    }

    if (answer.isCorrect !== null){
      timer = 2000;
    }

    setTimeout(()=> {
      setAnswer({
        selectedAnswer : answer,
        isCorrect :QUESTIONS[index].answers[0] === answer
      })
      // setTimeout(()=>{
      //     onSelectAnswer(answer);
      // }, 5000);
    }, 2000);

  }

  let answerState = '';
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  } else if (answer.selectedAnswer){
    answerState = 'answered'
  }
  return (
    <div id="question">
    <CountdownCircleTimer
    isPlaying={answer.selectedAnswer === ''}
    duration={timer/1000}
    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
    colorsTime={[10, 8, 5, 0]}
    onComplete={answer.selectedAnswer === '' ?  onSkipAnswer : null}
  >
    {({ remainingTime }) => remainingTime}
  </CountdownCircleTimer>
    <h2>{QUESTIONS[index].text}</h2>
    <Answers
      answers={QUESTIONS[index].answers}
      selectedAnswer={answer.selectedAnswer}
      answerState={answerState}
      onSelect={handleSelectAnswer}
    />
  </div>
  );
}