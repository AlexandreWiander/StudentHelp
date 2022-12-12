import type { NextApiRequest, NextApiResponse } from "next";
import {resolveObjectURL} from "buffer";

type Data = {
    file:any;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    fetch('https://porthos-intra.cg.helmo.be/e180478/Synthesis/'+req.body.id, {
        method: 'GET',
        headers: {
            'Authorization': 'bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJlc3RlbGxlLmphbnNAb3V0bG9vay5jb20iLCJleHAiOjE2NzA4NzE1NzR9.oPGsggonmpxd1ivOZSmOzJKbpGUsnc4lhcib-60MEN-FnqWu_DjI1h0ChwZIoeWcB9crF_dHFWZSKCoXh9gGWg',
        },
    }).then((response)=>{
        return response.blob();
    }).then((one)=>{
        var url = URL.createObjectURL(one);
        res.status(200).json({file:url});
    });

}