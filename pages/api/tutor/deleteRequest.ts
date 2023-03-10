import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const rawResponse = await fetch('https://rest-jans-wian.azurewebsites.net/TutorRequest/'+req.body.id+"?idRequest="+req.body.id, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'bearer '+req.body.token,
        },
    });
    if(rawResponse.status == 200){
        res.status(200).json({});
    } else {
        res.status(400).json({});
    }
}