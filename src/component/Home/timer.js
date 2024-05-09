import React, { useState, useEffect } from 'react';

function ReverseTimer() {
    const [timeLeft, setTimeLeft] = useState(0);
    let intervalId
    useEffect(() => {
        intervalId = setInterval(updateTimeLeft, 1000);

        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    const updateTimeLeft = () => {
        const currentDate = new Date();
        const targetDate = new Date("2024-05-15T00:00:00Z"); // May 15, 2024, in UTC
        const difference = targetDate - currentDate;

        const secondsLeft = Math.floor(difference / 1000);

        setTimeLeft(secondsLeft);

        if (secondsLeft <= 0) {
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
        <h6 className='mb-0 fw-bold'>{formatTime(timeLeft)}</h6>


    );
}

export default ReverseTimer;
