import crypto from "crypto";
import { validate as validateCpf } from "../../CpfValidator";
import { validate as validateEmail } from "../../EmailValidator";
import PassengerRepository from "../repository/PassengerRepository";

export default class CreatePassenger {
    constructor(readonly passengerRepository: PassengerRepository) {
    }

    async execute(input: Input): Promise<Output>{
        const passengerId = crypto.randomUUID();
        if (!validateCpf(input.document)) throw new Error("Invalid cpf");
        if (!validateEmail(input.email)) throw new Error("Invalid email");
        await this.passengerRepository.save(Object.assign(input, {passengerId}));
        return {
            passengerId
        };
    }
}

type Input = {
    name: string,
    email: string,
    document: string
}

type Output = {
    passengerId: string
}