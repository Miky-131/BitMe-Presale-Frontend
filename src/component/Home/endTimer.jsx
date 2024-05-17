import React, { useState, useEffect } from 'react';

function EndTimer({ saleStartIs, saleIs, setSaleIs, setIsRedeemEnable }) {
  const [timeLeft, setTimeLeft] = useState(0);
  let intervalId, intervalId2;
  useEffect(() => {
    intervalId = setInterval(updateTimeLeft, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    intervalId2 = setInterval(redeenTimeLeft, 1000);
    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId2);
  }, []);

  const updateTimeLeft = () => {
    if (saleStartIs === 'OVER') {
      setSaleIs('LIVE');
    }
    const currentDate = new Date();
    // currentDate.setTime(currentDate.getTime() + (14 * 60 * 60 * 1000));
    let targetDate = new Date("Tue May 22 2024 17:00:00 GMT");
    // targetDate.setTime(targetDate.getTime() + (14 * 60 * 60 * 1000));
    const difference = targetDate - currentDate;

    const secondsLeft = Math.floor(difference / 1000);

    setTimeLeft(secondsLeft);

    if (secondsLeft <= 0) {
      setSaleIs('ENDED');
      clearInterval(intervalId);
    }
  };

  const redeenTimeLeft = () => {
    const currentDate = new Date();
    // currentDate.setTime(currentDate.getTime() + (14 * 60 * 60 * 1000));
    let targetDate = new Date("Tue May 21 2024 17:00:00 GMT");
    // targetDate.setTime(targetDate.getTime() + (14 * 60 * 60 * 1000));

    const difference = targetDate - currentDate;
    const secondsLeft = Math.floor(difference / 1000);
    if (secondsLeft <= 0) {
      setIsRedeemEnable(true);
      clearInterval(intervalId2);
    }
  };
  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${days.toString().padStart(2, '0')} : ${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {saleStartIs == 'OVER' && saleIs == 'LIVE' ?
        <h6 className='mb-0 fw-bold'>{formatTime(timeLeft)}</h6>
        :
        <h6 className='mb-0 fw-bold'>{saleIs == 'ENDED' ? '00' : '05' } : 00 : 00 : 00</h6>
      }
    </>
  );
}

export default EndTimer;
