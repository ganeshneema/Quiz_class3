import {useState, useCallback, useEffect} from 'react';
//import Question from './Question.jsx';
import MathQuestion from './MathQuestion.jsx';
import QUESTIONS from '../questions.js'
import Summary from './summary.jsx';
import  Button from 'react-bootstrap/Button';
import SummaryAll from './SummaryAll.jsx';

export default function Quiz(){
  const [userAnswers, setUserAnswers] = useState([]);
  const [isquizStarted, setQuizStared] = useState(false);

  const activeQueIndex = userAnswers.length;
  const quizIsComplete = activeQueIndex === 10; //QUESTIONS.length;

  let disableButton = false;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer){
      disableButton = true;
      setUserAnswers((previousUserAnswers) =>{
        console.log('selected answer = ' ,selectedAnswer);
        console.log('previous answers = ', previousUserAnswers);
        return[...previousUserAnswers, selectedAnswer]
      });
    },
    []
  );

  function handleOnNextQuestion () {
    console.log('handle on next question');
    handleSkipAnswer()
  }
  function handleQuizStarted() {
    console.log('quiz started');
    setUserAnswers([]);
    setQuizStared(true);
  };
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  let okCorrect =0; 
  let okWrong = 0;
  let okSkipped = 0;
  for (let index = 0; index < userAnswers.length; index++) { 
    if(!userAnswers[index]){
      ++okSkipped;
    } else if (userAnswers[index].isCorrect){
      okCorrect++;
    } else {
      okWrong++;
    }
  }

  if(quizIsComplete){
    return (
      <>
      <Summary 
        correct={okCorrect}
        skipped={okSkipped}
        wrong={okWrong}
        reStartQuiz={handleQuizStarted}
      ></Summary>
      </>
    );
  }
  if (!isquizStarted){
    return (
      <div id="quiz">
        <Button
          variant="primary"
          size="lg"
          onClick={handleQuizStarted}
        > Start Quiz </Button>
      </div>
    );
  }

  return (
    <div id="quiz">
      <div>
      <SummaryAll
      correct={okCorrect}
      skipped={okSkipped}
      wrong={okWrong}
      />
      </div>
      <p>{}</p>
      <div>
      <MathQuestion
        key={activeQueIndex}
        index={activeQueIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
      </div>
    </div>
  )
}