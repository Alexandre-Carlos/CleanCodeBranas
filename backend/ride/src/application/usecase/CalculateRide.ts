import Ride from "../../domain/Ride";

export default class CaldulateRide {
    constructor() {     
    }

    async execute(input: Input): Promise<Output> {
        //const price = calculate(input.segments);
        const ride = new Ride();
        for (const segment of input.segments) {
            ride.addSegment(segment.distance, new Date(segment.date));
        }
        const price = ride.calculate();
        return {price};
    }
}

type Input = {
    segments: {distance: number, date: Date}[]
};

type Output = {
    price: number
};