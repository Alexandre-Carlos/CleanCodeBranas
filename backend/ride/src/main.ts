// @ts-nocheck
import express from 'express';
import { isOverNight, isSunday, isValidDistance, isValidDate } from './RideCalculator';
const app = express();
app.use(express.json());


app.post("/calculate_ride", function (req, res) {
    let price = 0;
    for (const segment of req.body.segments) {
        segment.date = new Date(segment.date);
        if (!isValidDistance(segment))  return res.json({ price: -1 });
        if (!isValidDate(segment))  return res.json({ price: -2 });
        
        if (isOverNight(segment)) 
        {
            if (!isSunday(segment))  {
                price += segment.distance * 3.90;
            } else {
                price += segment.distance * 5;
            }
        } else {
            if (isSunday(segment)) {
                price += segment.distance * 2.9;
            } else {
                price += segment.distance * 2.10;
            }
        }
    }
    if (price <10){
        price = 10;
    }
    res.json({ price });
    return;
});

app.listen(3000);