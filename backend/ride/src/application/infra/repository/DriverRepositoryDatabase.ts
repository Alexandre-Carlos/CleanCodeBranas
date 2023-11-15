import pgp from "pg-promise";
import DriverRepository from "../../repository/DriverRepository";

export default class DriverRepositoryDataBase implements DriverRepository {
    async save(driver: any) {
        const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
        await connection.query("insert into cccat12.driver (driver_id, name, email, document, car_plate) values ($1,$2,$3,$4, $5)", 
        [driver.driverId, driver.name, driver.email, driver.document, driver.carPlate])
        await connection.$pool.end();
    }

    async get(driverId: string) {
        const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
        const [driverData] = await connection.query("select * from cccat12.driver where driver_id = $1",
        [driverId]);
        await connection.$pool.end();
        return driverData;
    }
}

type Input = {};
type Output = {};