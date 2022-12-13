import type { NextApiRequest, NextApiResponse } from "next";
import DateTimeFormat = Intl.DateTimeFormat;
import FormData from "form-data";
import axios from "axios";
import {Synthese} from "./getSynths";

export const config = {
    api: {
        bodyParser: false,
    },
};
type Data = {

}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    console.log(req.body);
    const rawResponse = await fetch('https://porthos-intra.cg.helmo.be/e180478/Synthesis', {
        method: 'Post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJlc3RlbGxlLmphbnNAb3V0bG9vay5jb20iLCJleHAiOjE2NzEwMTI1NDl9.X0ayCbSpyA8cGjZbtDw00CQPcUJ-pbwt2D0QO8Fty0xy0Vfb-X7h9iqnNsEyXkt2jjuM2fqGy9bJadUendlQxQ',
        },
        body:req.body,

    });
    const content = await rawResponse.json();
    if(rawResponse.status == 200){
        res.status(200).json({});
    } else {
        res.status(400).json({});
    }
}