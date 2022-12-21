import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    discution: any[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    await fetch("https://rest-jans-wian.azurewebsites.net/Message?idUser1=" + req.body.idCurrentUser + "&idUser2=" + req.body.idOtherUser, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + req.body.token, 
            }
    }).then((res) => res.json())
    .then((result) => {
      res.status(200).json({ discution: result});
    });
    }