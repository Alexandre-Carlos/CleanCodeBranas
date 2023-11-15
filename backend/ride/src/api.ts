import express from 'express';
//import Ride from './Ride';
import CalculateRide from './application/usecase/CalculateRide';
import CreatePassenger from './application/usecase/CreatePassenger';
import CreateDriver from './application/usecase/CreateDriver';
import GetPassenger from './application/usecase/GetPassenger';
import GetDriver from './application/usecase/GetDriver';
import PassengerRepositoryDataBase from './application/infra/repository/PassengerRepositoryDatabase';
import DriverRepositoryDataBase from './application/infra/repository/DriverRepositoryDatabase';

// driver, primary actor, inbound adapter
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
        const usecase = new CreatePassenger(new PassengerRepositoryDataBase());
        const output = await usecase.execute(req.body);
        res.json(output);
    } catch (e: any) {
        res.status(422).send(e.message);
    }
});

app.get("/passengers/:passengerId", async function (req, res) {
    const usecase = new GetPassenger(new PassengerRepositoryDataBase());
    const output = await usecase.execute({ passengerId: req.params.passengerId });
    res.json(output);
});

app.post("/drivers", async function (req, res){
    try {
        const usecase = new CreateDriver(new DriverRepositoryDataBase());
        const output = await usecase.execute(req.body);
        res.json(output);
    } catch (e: any) {
        res.status(422).send(e.message)
    }
});

app.get("/drivers/:driverId", async function (req, res){
    const usecase = new GetDriver(new DriverRepositoryDataBase());
    const output = await usecase.execute({ driverId: req.params.driverId });
    res.json(output);
});

app.listen(3000);