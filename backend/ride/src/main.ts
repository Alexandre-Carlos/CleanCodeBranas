// @ts-nocheck
import express from 'express';
import { calculate } from './RideCalculator';
const app = express();
app.use(express.json());

//Meio de transmissão ou driver
app.post("/calculate_ride", function (req, res) {
    //início do negócio
    for (const segment of req.body.segments) {
        segment.date = new Date(segment.date);
    }
    const price = calculate(req.body.segments);
    //fim do negócio
    res.json({ price });
});

app.listen(3000);