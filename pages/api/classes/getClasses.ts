import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    listClasses: Class[];//list
}
export interface Class{
    id:number,
    name:string,
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const rawResponse = await fetch('https://porthos-intra.cg.helmo.be/e180478/Class', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJlc3RlbGxlLmphbnNAb3V0bG9vay5jb20iLCJleHAiOjE2NzA3ODI2NTV9.1E5E6nJE_N9sW0B_fBSiCTlk-GQKmXguZkIVjGxR7voAqgbbKfjJtf9w36C0lnVn4jQMQ-A2qC7_7tIXIIZKSw',
        },
    });
    const content = await rawResponse.json();
    if(rawResponse.status == 200){
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
        res.status(400).json({listClasses:[]});
    }
}