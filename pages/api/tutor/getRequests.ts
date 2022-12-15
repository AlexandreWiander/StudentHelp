import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    requestsList: Request[];
}
export interface Request{
    id:number,
    tutorClassName:string,
    askName:string,
    tutorName: string,
    tutorId:number,
    commentaire:string,
    avatarTutor:number,
    isActive:boolean
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const rawResponse = await fetch('https://porthos-intra.cg.helmo.be/e180478/TutorRequest?id='+req.body.id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJlc3RlbGxlLmphbnNAb3V0bG9vay5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJ1c2VyIiwiZXhwIjoxNjcxMTg4MjQyfQ.6-4Uujav3_JzfhRWC99oHAo0OQBvNwbUJjFXAIZJIgdd5kcC1jB35os9iJKq9bluhL_-x388i8LcyLr1uZLktg',
        },
    });
    const content = await rawResponse.json();
    if(rawResponse.status == 200){
        var requests=[];
        for(var i=0; i<content.length; i++){
            var one = content[i];
            var user = one.user;
            var tuteur = one.tutor;
            var oneClass = one.class;
            const oneRequest : Request={
                id:one.id,
                tutorClassName:oneClass.name,
                tutorName:tuteur.firstName + " " + tuteur.lastName,
                askName:user.firstName+ " "+user.lastName,
                commentaire:one.comment,
                isActive:one.isActive,
                tutorId:one.tutorId,
                avatarTutor:tuteur.avatarNumber,
            }
            requests.push(oneRequest);
        }
        res.status(200).json({ requestsList: requests});
    } else {
        res.status(200).json({requestsList:[]});
    }
}