import type { NextApiRequest, NextApiResponse } from "next";
import { ListFormat } from "typescript";

type Data = {
    discutionList: ListFormat;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
const rep = await fetch("https://porthos-intra.cg.helmo.be/e180478/Message/" + req.body.idCurrentUser, {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + req.body.token, 
        }
}).then((res) => res.json())
.then((result) => {
  res.status(200).json({ discutionList: result});
});
}