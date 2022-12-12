import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    listSynth: Synthese[];//list
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
    const rawResponse = await fetch('https://porthos-intra.cg.helmo.be/e180478/Synthesis/class/'+req.body.id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJlc3RlbGxlLmphbnNAb3V0bG9vay5jb20iLCJleHAiOjE2NzA4NzE1NzR9.oPGsggonmpxd1ivOZSmOzJKbpGUsnc4lhcib-60MEN-FnqWu_DjI1h0ChwZIoeWcB9crF_dHFWZSKCoXh9gGWg',
        },
    });
    const content = await rawResponse.json();
    if(rawResponse.status == 200){
        var syntheses=[];
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
        }
        res.status(200).json({ listSynth: syntheses});
    } else {
        res.status(400).json({listSynth:[]});
    }
}