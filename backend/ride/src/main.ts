// @ts-nocheck
import express from 'express';
import { isOverNight, isSunday } from './RideCalculator';
const app = express();
app.use(express.json());


app.post("/calculate_ride", function (req, res) {
    let price = 0;
    for (const segment of req.body.segments) {
        segment.date = new Date(segment.date);
        if (segment.distance != null && segment.distance != undefined && typeof segment.distance === "number" && segment.distance > 0)  
        {
            if (segment.date != null && segment.date != undefined && segment.date instanceof Date && segment.date.toString() !== "Invalid Date") 
            {
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
            }  else {
                //console.log(d);
                res.json({ price: -2 });
                return;
            }
        } else {
            //console.log(req.body.dist);
            res.json({ price: -1 });
            return;
        }
    }
    if (price <10){
        price = 10;
    }
    res.json({ price });
    return;
});

app.listen(3000);