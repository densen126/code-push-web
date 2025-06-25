import React, { useEffect, useRef, useState } from 'react';

export interface CountdownProps {
    leftTime?: number;
    timeoutCb?: () => void;
    renderFunc: (args: { day: number; hour: number; minute: number; second: number }) => JSX.Element;
    renderRetryFunc: (retryTimes: number) => JSX.Element;
    level?: number;
    second?: number;
}

function Countdown({
    leftTime = 0,
    timeoutCb,
    renderFunc,
    renderRetryFunc,
    level = 1,
    second = 1,
}: CountdownProps) {
    const [time, setTime] = useState(leftTime);
    const retryTimes = useRef(0);

    useEffect(() => {
        setTime(leftTime);
    }, [leftTime]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prev) => {
                if (prev <= 0) {
                    retryTimes.current += 1;
                    timeoutCb?.();
                    clearInterval(timer);
                    return 0;
                }
                return prev - second;
            });
        }, second * 1000);
        return () => clearInterval(timer);
    }, [second, timeoutCb]);

    const leftTimeSplit = (lt: number, showLevel = 4) => {
        let day = 0,
            hour = 0,
            minute = 0,
            sec = 0;
        if (lt > 0) {
            if (showLevel >= 4) {
                day = Math.floor(lt / (60 * 60 * 24));
            }
            if (showLevel >= 3) {
                hour = Math.floor(lt / (60 * 60)) - day * 24;
            }
            if (showLevel >= 2) {
                minute = Math.floor(lt / 60) - day * 24 * 60 - hour * 60;
            }
            sec = Math.floor(lt) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;
        }
        return { day, hour, minute, second: sec };
    };

    if (time <= 0) {
        return renderRetryFunc(retryTimes.current);
    }

    return renderFunc(leftTimeSplit(time, level));
}

export default Countdown;
