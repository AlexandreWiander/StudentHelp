import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    listSynth: Synthese[];
    myListSynth:Synthese[];
}
export interface Synthese{
    id:number,
    name:string,
    creationDate:Date,
    authorName: string,
    idAuthor:number,
    className:string,
    classId:number
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const rawResponse = await fetch('https://porthos-intra.cg.helmo.be/e180478/Synthesis', {
        method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
            'Authorization': 'bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJlc3RlbGxlLmphbnNAb3V0bG9vay5jb20iLCJleHAiOjE2NzEwMTI1NDl9.X0ayCbSpyA8cGjZbtDw00CQPcUJ-pbwt2D0QO8Fty0xy0Vfb-X7h9iqnNsEyXkt2jjuM2fqGy9bJadUendlQxQ',
        },
    });
    const content = await rawResponse.json();
    if(rawResponse.status == 200){
        var syntheses=[];
        var mySyntheses=[];
        for(var i=0; i<content.length; i++){
            var one = content[i];
            var user = one.user;
            const oneSynthese : Synthese={
                id:one.id,
                name: one.name,
                creationDate: new Date(Date.parse(one.creationDate)),
                authorName: `${user.firstName} ${user.lastName}`,
                classId: one.class.id,
                className: one.class.name,
                idAuthor: user.id,
            }
            syntheses.push(oneSynthese);
            if(oneSynthese.idAuthor==3){
                mySyntheses.push(oneSynthese);
            }
        }
        res.status(200).json({ listSynth: syntheses, myListSynth:mySyntheses});
    } else {
        res.status(400).json({listSynth:[], myListSynth:[]});
    }
  }