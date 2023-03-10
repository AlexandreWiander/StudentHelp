import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    listClasses: Class[];//list
}
export interface Class{
    id:number,
    name:string,
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const rawResponse = await fetch('https://rest-jans-wian.azurewebsites.net/Class', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'bearer '+req.body.token,
        },
    });
    
    if(rawResponse.status == 200){
        const content = await rawResponse.json();
        var cours=[];
        for(var i=0; i<content.length; i++){
            var one = content[i];
            const oneCours : Class={
                id:one.id,
                name: one.name,
            }
            cours.push(oneCours);
        }
        res.status(200).json({ listClasses: cours});
    } else {
        res.status(200).json({listClasses:[]});
    }
}