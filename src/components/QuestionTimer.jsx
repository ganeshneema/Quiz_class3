import { useEffect, useState } from "react";

export default function QuestionTimer({timeout, onTimeOut, mode}) {

  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    console.log('setting tme out');
    const timer = setTimeout(onTimeOut, timeout);

    return () => {
      clearTimeout(timer);
    }

  }, [timeout, onTimeOut]);

  useEffect(() => {
    const interval = setInterval(()=>{
      setRemainingTime((prevRemainingTime) => prevRemainingTime -100);
    }, 100)

    return () => {
      clearInterval(interval);
    }
  }, [timeout]);

  return <progress id='question-timer' max={timeout} value={remainingTime} className={mode} />;
}