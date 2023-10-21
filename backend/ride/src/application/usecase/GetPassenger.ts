import pgp from "pg-promise";

export default class GetPassenger {
    constructor() {
    }

    async execute(input: Input): Promise<Output>{
        const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
        const [passengerData] = await connection.query("select * from cccat12.passenger where passenger_id = $1", [input.passengerId]);
        await connection.$pool.end();
        return {
            passengerId: passengerData.passenger_id,
            name: passengerData.name,
            email: passengerData.email,
            document: passengerData.document
        };
    }
}

type Input = {
    passengerId: string
}

type Output = {
    passengerId: string,
    name: string,
    email: string,
    document: string
}