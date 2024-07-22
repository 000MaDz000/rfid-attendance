export default function numberToTime(number: number) {
    if (typeof number !== "number" || isNaN(number)) return "00";
    return number > 10 ? number : `0${number}`;
}