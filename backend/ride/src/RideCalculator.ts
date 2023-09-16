// @ts-nocheck
export function isOverNight(segment) {
    return segment.date.getHours() >= 22 || segment.date.getHours() <= 6;
}

export function isSunday(segment) {
    return segment.date.getDay() === 0;
};

export function isValidDistance(segment){
    return segment.distance != null && segment.distance != undefined && typeof segment.distance === "number" && segment.distance > 0;
}

export function isValidDate(segment){
    return segment.date != null && segment.date != undefined && segment.date instanceof Date && segment.date.toString() !== "Invalid Date";
};