import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    synthNumber: any[];
}


export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    await fetch("https://rest-jans-wian.azurewebsites.net/Synthesis/synthesisNumber", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            }
    }).then((res) => res.json())
    .then((result) => {
        let synth = result;
        if(res.statusCode == 200){
            res.status(200).json({ synthNumber: synth});
        }
        
    });
}