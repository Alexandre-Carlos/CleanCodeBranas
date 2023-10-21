import express from 'express';
//import Ride from './Ride';
import pgp from "pg-promise";
import crypto from "crypto";
import { validate } from './CpfValidator';
import { calculate } from './RideCalculator';
import CalculateRide from './application/usecase/CalculateRide';

const app = express();
app.use(express.json());

//Meio de transmissão ou driver
app.post("/calculate_ride", async function (req, res) {
    try {
        const usecase = new CalculateRide();
        const output = await usecase.execute(req.body);
        res.json(output);
    } catch (e: any) {
        res.status(422).send(e.message);
    }
});

app.post("/passengers", async function (req, res) {
    try {
        const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
        const passengerId = crypto.randomUUID();
        if (!validate(req.body.document)) throw new Error("Invalid cpf");
        await connection.query("insert into cccat12.passenger (passenger_id, name, email, document) values ($1, $2, $3, $4)", 
            [passengerId, req.body.name, req.body.email, req.body.document]);
        await connection.$pool.end();
        res.json({passengerId});
    } catch (e: any) {
        res.status(422).send(e.message);
    }
});

app.get("/passengers/:passengerId", async function (req, res) {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    const [passengerData] = await connection.query("select * from cccat12.passenger where passenger_id = $1", [req.params.passengerId]);
    await connection.$pool.end();
    res.json(passengerData);
});

app.post("/drivers", async function (req, res){
    try {
        const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
        const driverId = crypto.randomUUID();
        if (!validate(req.body.document)) throw new Error("Invalid cpf");
        await connection.query("insert into cccat12.driver (driver_id, name, email, document, car_plate) values ($1, $2, $3, $4, $5)",
            [driverId, req.body.name, req.body.email, req.body.document, req.body.carPlate]);
        await connection.$pool.end();
        res.json({
            driverId
        });
    } catch (e: any) {
        res.status(422).send(e.message)
    }
});

app.get("/drivers/:driverId", async function (req, res){
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    const [driverData] = await connection.query("select * from cccat12.driver where driver_id = $1",
    [req.params.driverId]);
    await connection.$pool.end();
    res.json({
        driverId: driverData.driver_id,
        name: driverData.name,
        email: driverData.email,
        document: driverData.document,
        carPlate: driverData.car_plate
    });
});

app.listen(3000);