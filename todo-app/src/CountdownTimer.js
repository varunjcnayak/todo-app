import React, { useState, useEffect } from 'react';

function CountdownTimer({ dueDate }) {
  const [remainingTime, setRemainingTime] = useState(dueDate - new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(dueDate - new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [dueDate]);

  const formatTime = (time) => {
    
    const seconds = Math.floor(time / 1000) % 60;
    const minutes = Math.floor(time / (1000 * 60)) % 60;
    const hours = Math.floor(time / (1000 * 60 * 60)) % 24;
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div>
      {remainingTime > 0 ? (
        <span>Time remaining: {formatTime(remainingTime)}</span>
      ) : (
        <span>Time's up!</span>
      )}
    </div>
  );
}

export default CountdownTimer;
