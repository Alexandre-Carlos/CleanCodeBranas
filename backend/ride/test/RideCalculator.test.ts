import { isOverNight, isSunday } from "../src/RideCalculator";

test("Deve testar se é overnigth", function () {
    const segment = {
        dist:10, date: new Date("2021-03-01T23:00:00")
    };
    expect(isOverNight(segment)).toBeTruthy();
});

test("Deve testar se é domingo", function () {
    const segment = {
        dist:10, date: new Date("2021-03-07T10:00:00")
    };
    expect(isSunday(segment)).toBeTruthy();
});