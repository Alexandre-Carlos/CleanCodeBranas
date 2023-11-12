import pgp from "pg-promise";

export default class GetDriver {
    constructor() {
    }

    async execute(input: Input): Promise<Output> {
        const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
        const [driverData] = await connection.query("select * from cccat12.driver where driver_id = $1",
        [input.driverId]);
        await connection.$pool.end();
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