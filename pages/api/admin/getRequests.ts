import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    requestList: any[];
}


export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    await fetch("https://rest-jans-wian.azurewebsites.net/AdminContact", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + req.body.token, 
            }
    }).then((res) => res.json())
    .then((result) => {
        let requests = result;
        
        res.status(200).json({ requestList: requests});
    });
}