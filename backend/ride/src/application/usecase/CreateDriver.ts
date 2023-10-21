import pgp from "pg-promise";
import crypto from "crypto";
import { validate } from "../../CpfValidator";

export default class CreateDriver {
    constructor() {
    }

    async execute(input: Input): Promise<Output> {
        const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
        const driverId = crypto.randomUUID();
        if (!validate(input.document)) throw new Error("Invalid cpf");
        await connection.query("insert into cccat12.driver (driver_id, name, email, document, car_plate) values ($1, $2, $3, $4, $5)", 
        [driverId, input.name, input.email, input.document, input.carPlate]);
        await connection.$pool.end();
        return {
            driverId
        };
    }
}

//DTO - Data Transfer Object
type Input = {
    name: string,
    email: string,
    document: string,
    carPlate: string
};

//DTO - Data Transfer Object
type Output = {
    driverId: string
};