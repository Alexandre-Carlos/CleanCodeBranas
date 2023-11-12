import crypto from "crypto";
import { validate } from "../../CpfValidator";
import DriverRepository from "../infra/repository/DriverRepository";

//Application
export default class CreateDriver {
    constructor() {
    }

    async execute(input: Input): Promise<Output> {

        const driverId = crypto.randomUUID();
        if (!validate(input.document)) throw new Error("Invalid cpf");
        const driverRepository = new DriverRepository();
        await driverRepository.save(Object.assign(input,{ driverId}));
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