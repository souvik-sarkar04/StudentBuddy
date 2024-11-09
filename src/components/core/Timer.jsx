import { useState, useEffect } from "react";

export default function Timer({deadlines}) {
	let now = new Date(deadlines);
	let deadline = {days: now.getDate(), hours:now.getHours(), minutes:now.getMinutes(), seconds:now.getSeconds()};
    const [deadlineTime] = useState({
        days: deadline.days,
        hours: deadline.hours,
        minutes: deadline.minutes,
        seconds: deadline.seconds
    });

    const getCurrentTime = () => {
        const now = new Date();
        return {
            days: now.getDate(),
            hours: now.getHours(),
            minutes: now.getMinutes(),
            seconds: now.getSeconds()
        };
    };

    const [currentTime, setCurrentTime] = useState(getCurrentTime());

    const calculateRemainingTime = () => {
        let remainingDays = deadlineTime.days - currentTime.days;
        let remainingHours = deadlineTime.hours - currentTime.hours;
        let remainingMinutes = deadlineTime.minutes - currentTime.minutes;
        let remainingSeconds = deadlineTime.seconds - currentTime.seconds;

        if (remainingSeconds < 0) {
            remainingSeconds += 60;
            remainingMinutes -= 1;
        }
        if (remainingMinutes < 0) {
            remainingMinutes += 60;
            remainingHours -= 1;
        }
        if (remainingHours < 0) {
            remainingHours += 24;
            remainingDays -= 1;
        }

        return {
            remainingDays,
            remainingHours,
            remainingMinutes,
            remainingSeconds
        };
    };

    const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(getCurrentTime());
            setRemainingTime(calculateRemainingTime());
        }, 1000);

        return () => clearInterval(interval);
    }, [currentTime]);

    return (

            <div className="h-10 w-36 grid grid-cols-4 gap-1 text-center justify-center">
                <div className={`${(remainingTime.remainingDays <= 0 && remainingTime.remainingHours < 12) ? "bg-red-600" : "bg-blue-200"} flex flex-col items-center p-2 h-8 w-8 rounded-lg shadow`}>
                    <span className="text-sm font-bold">{remainingTime.remainingDays}</span>
                </div>
                <div className={`${(remainingTime.remainingDays <= 0 && remainingTime.remainingHours < 12) ? "bg-red-600" : "bg-blue-200"} flex flex-col items-center p-2 h-8 w-8 rounded-lg shadow`}>
                    <span className="text-sm font-bold">{remainingTime.remainingHours}</span>
                </div>
                <div className={`${(remainingTime.remainingDays <= 0 && remainingTime.remainingHours < 12) ? "bg-red-600" : "bg-blue-200"} flex flex-col items-center p-2 h-8 w-8 rounded-lg shadow`}>
                    <span className="text-sm font-bold">{remainingTime.remainingMinutes}</span>
                </div>
                <div className={`${(remainingTime.remainingDays <= 0 && remainingTime.remainingHours < 12) ? "bg-red-600" : "bg-blue-200"} flex flex-col items-center p-2 h-8 w-8 rounded-lg shadow`}>
                    <span className="text-sm font-bold">{remainingTime.remainingSeconds}</span>
                </div>
            </div>
    );
}