import { useRef } from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';

export default function Answers ({
  answers, 
  selectedAnswer, 
  corrAns,
  onSelect
  }) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current){
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(()=>Math.random() - 0.5);
  }

  return (
    <>
    <ul id="answer">
      {shuffledAnswers.current.map((answer)=> {
        const isSelected = selectedAnswer === answer;
        let cssClass = '';
        const gotAnswer = selectedAnswer !== '';
        const ansCorrect = answer === corrAns;
        if (isSelected) {
          cssClass = 'selected';
        }
        const isSelectedCorrect = isSelected && ansCorrect;
        const isSelectedWrong = isSelected && !ansCorrect;
        
        const showTick = isSelectedCorrect || (gotAnswer && !isSelected && ansCorrect);
        console.log('current ans = ', answer, 'correct = ', corrAns);
        console.log('is selected wrong = ', isSelectedWrong);
        console.log('show tick = ', showTick , '  wrong = ', isSelectedWrong);
        return (
          <li key={answer} className="answer">
            <div>
            <button
              onClick={() => onSelect(answer)}
              className={cssClass} 
              disabled={gotAnswer}
              >
                {answer}
                {showTick  && <CheckCircleOutlineIcon  fontSize="large" color="success" /> }
                {isSelectedWrong && <ClearIcon  fontSize="large" color="danger" />}
                </button>
              
              </div>
              <p></p>
          </li>
        )
      })}
      
    </ul>
    <p></p>
    </>
  );
}