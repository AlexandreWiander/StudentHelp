import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    listTutors: Request[];
}
export interface Request{
    id:number,
    name:string,
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const rawResponse = await fetch('https://porthos-intra.cg.helmo.be/e180478/Class/tutors?id='+req.body.id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJlc3RlbGxlLmphbnNAb3V0bG9vay5jb20iLCJleHAiOjE2NzEwMTI1NDl9.X0ayCbSpyA8cGjZbtDw00CQPcUJ-pbwt2D0QO8Fty0xy0Vfb-X7h9iqnNsEyXkt2jjuM2fqGy9bJadUendlQxQ',
        },
    });
    const content = await rawResponse.json();
    if(rawResponse.status == 200){
        var tutors=[];
        for(var i=0; i<content.length; i++){
            var one = content[i];
            const oneTutor : Request={
                id:one.id,
                name: one.firstName + " " + one.lastName,
            }
            tutors.push(oneTutor);
        }
        res.status(200).json({ listTutors: tutors});
    } else {
        res.status(400).json({listTutors:[]});
    }
}