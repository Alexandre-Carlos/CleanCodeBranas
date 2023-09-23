// @ts-nocheck
import express from 'express';
import Ride from './Ride';
const app = express();
app.use(express.json());

//Meio de transmissão ou driver
app.post("/calculate_ride", function (req, res) {
    try {
        const ride = new Ride();
        for (const segment of req.body.segments) {
            ride.addSegment(segment.distance, new Date(segment.date));
        }
        const price = ride.calculate();
        //fim do negócio
        res.json({ price });
    } catch (e) {
        res.status(422).send(e.message);
    }
});

app.listen(3000);