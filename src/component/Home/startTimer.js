import React, { useState, useEffect } from 'react';

function StartTimer({ saleStartIs, setSaleStartIs, setSaleIs }) {
    const [timeLeft, setTimeLeft] = useState(0);
    let intervalId
    useEffect(() => {
        intervalId = setInterval(updateTimeLeft, 1000);

        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    const updateTimeLeft = () => {
        // const currentDate = new Date();
        // console.log(currentDate)
        // var newDateObj = new Date();
        // newDateObj.setTime(currentDate.getTime() + (14 * 60 * 60 * 1000)); // 14 hours added as client want
        // console.log(newDateObj)
        // const targetDate = new Date("Fri May 11 2024 08:00:00 GMT-0400"); // May 15, 2024, 08:00 AM in UTC
        // targetDate.setTime(targetDate.getTime() + (14 * 60 * 60 * 1000));
        // const difference = targetDate - newDateObj;

        // const currentDate = new Date();
        // const targetDate = new Date("Fri May 15 2024 08:00:00"); // May 15, 2024, 08:00 AM in UTC

        const currentDate = new Date();
        // console.log('currentDate', currentDate);
        // currentDate.setTime(currentDate.getTime() + (14 * 60 * 60 * 1000));
        let targetDate = new Date("Thu May 17 2024 17:00:00 GMT");
        // console.log('targetDate', targetDate);
        // targetDate.setTime(targetDate.getTime() + (14 * 60 * 60 * 1000));

        const difference = targetDate - currentDate;

        const secondsLeft = Math.floor(difference / 1000);

        setTimeLeft(secondsLeft);
        if (secondsLeft <= 0) {
            setSaleStartIs('OVER');
            setSaleIs('LIVE');
            clearInterval(intervalId);
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
            {saleStartIs == 'RUNNING' ?
                <h6 className='mb-0 fw-bold'>{formatTime(timeLeft)}</h6>
                :
                <h6 className='mb-0 fw-bold'>00 : 00 : 00 : 00</h6>
            }
        </>
    );
}

export default StartTimer;
