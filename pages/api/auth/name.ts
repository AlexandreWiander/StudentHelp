import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
const rep = await fetch("https://rest-jans-wian.azurewebsites.net/Auth/" + req.body.id);

const content = await rep.json();
res.status(200).json({ name: content[0]});
}