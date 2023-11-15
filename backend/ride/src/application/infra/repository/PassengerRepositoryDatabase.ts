import pgp from "pg-promise";
import PassengerRepository from "../../repository/PassengerRepository";

export default class PassengerRepositoryDataBase implements PassengerRepository {
    async save(passenger: any) {
        const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
        await connection.query("insert into cccat12.passenger (passenger_id, name, email, document) values ($1, $2, $3, $4)", 
        [passenger.passengerId, passenger.name, passenger.email, passenger.document]);
        await connection.$pool.end();
    }

    async get(passengerId: string) {
        const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
        const [passengerData] = await connection.query("select * from cccat12.passenger where passenger_id = $1",
        [passengerId]);
        await connection.$pool.end();
        return passengerData;
    }
}