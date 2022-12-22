import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    contenu:string,
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const linkResponse = await fetch('https://rest-jans-wian.azurewebsites.net/EventClass/link?link='+req.body.link,{
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'bearer '+req.body.token,
        }
    });
    if(linkResponse.status==200){
        console.log(linkResponse.body);
        var contenu = new TextDecoder("utf-8").decode(await linkResponse.arrayBuffer());
        console.log(contenu);
        res.status(200).json({contenu:contenu});
    }else{
        res.status(200).json({contenu:"/"});
    }

}
