import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    propositionList: Proposition[];
}
export interface Proposition{
    id:number,
    name:string,
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const rawResponse = await fetch('https://porthos-intra.cg.helmo.be/e180478/Class/props?id='+req.body.id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJlc3RlbGxlLmphbnNAb3V0bG9vay5jb20iLCJleHAiOjE2NzEwMzA1NjZ9.vtiY4_uAJGthc-nLmDWVmMht815WjowCblwO3tqQMcH0-59Lerld9wZl8mRKHFojOiljFNNd-YQVfLeGgMLAog',
        },
    });
    const content = await rawResponse.json();
    if(rawResponse.status == 200){
        var propositions=[];
        for(var i=0; i<content.length; i++){
            var one = content[i];
            const oneProposition : Proposition={
                id:one.id,
                name:one.name,
            }
            propositions.push(oneProposition);
        }
        res.status(200).json({ propositionList: propositions});
    } else {
        res.status(200).json({propositionList:[]});
    }
}