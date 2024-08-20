import quizCompleteImg from '../assets/quiz-complete.png'
import  Button from 'react-bootstrap/Button';
import SummaryAll from './SummaryAll';

export default function Summary({
  reStartQuiz, correct, wrong, skipped
}){
  return (
    <div id = "summary">
    <img src={quizCompleteImg} alt="quiz done" />
    <h2> Quiz  Complete !!! </h2>
    <p></p>
    <div>
    <SummaryAll
        correct={correct}
        skipped={skipped}
        wrong={wrong}
      ></SummaryAll>
    </div>
    <div id="quiz">
        <Button
          variant="primary"
          size="lg"
          onClick={reStartQuiz}
        > New Quiz </Button>
      </div>
  </div>
  );
}