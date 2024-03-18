import numberToTime from "./number-to-time";

type Time = {
    hours: number;
    minutes: number;
    seconds: number;
}
export default function resolveTime({ hours, minutes, seconds }: Time): Time {
    if (seconds >= 60) {
        return resolveTime({
            hours,
            minutes: minutes + 1,
            seconds: seconds - 60,
        })
    }

    if (minutes >= 60) {
        return resolveTime({ hours: hours + 1, minutes: minutes - 60, seconds });
    }

    return {
        hours,
        minutes,
        seconds,
    }
}


export function timeToString(time: Time): string {
    return `${numberToTime(time.hours)}:${numberToTime(time.minutes)}:${numberToTime(time.seconds)}`;
}