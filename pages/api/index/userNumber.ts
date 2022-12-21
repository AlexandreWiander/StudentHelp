import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    userNumber: any[];
}


export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    await fetch("https://rest-jans-wian.azurewebsites.net/Auth/userNumber", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            }
    }).then((res) => res.json())
    .then((result) => {
        let userNumber = result;        
        
        res.status(200).json({ userNumber: userNumber});
    });
}