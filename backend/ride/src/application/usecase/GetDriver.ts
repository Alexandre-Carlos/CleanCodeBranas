import DriverRepository from "../infra/repository/DriverRepository";
export default class GetDriver {
    constructor() {
    }

    async execute(input: Input): Promise<Output> {
        const driverRepository = new DriverRepository();
        const driverData = await driverRepository.get(input.driverId);
        return {
            driverId: driverData.driver_id,
            name: driverData.name,
            email: driverData.email,
            document: driverData.document,
            carPlate: driverData.car_plate
        };
    }
}

type Input = {
    driverId: string
};

type Output = {
    driverId: string,
    name: string,
    email: string,
    document: string,
    carPlate: string
};