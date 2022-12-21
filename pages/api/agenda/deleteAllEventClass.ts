import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const response = await fetch('https://rest-jans-wian.azurewebsites.net/EventClass/'+req.body.id,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'bearer '+req.body.token,
        },
    })
    if(response.status==200){
        res.status(200).json({});
    } else {
        res.status(400).json({});
    }

}
