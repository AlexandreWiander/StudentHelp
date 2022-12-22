import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    icalendar:string,
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const linkString = req.body.link.toString();
    const linkResponse = await fetch('https://rest-jans-wian.azurewebsites.net/EventClass/link?link='+linkString,{
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'bearer '+req.body.token,
        }
    });
    if(linkResponse.status==200){
        var contenu = new TextDecoder("utf-8").decode(await linkResponse.arrayBuffer()).toString();
        res.status(200).json({icalendar:contenu});
    }else{
        res.status(200).json({icalendar:"/"});
    }

}
