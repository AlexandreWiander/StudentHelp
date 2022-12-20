import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const rawResponse = await fetch('https://porthos-intra.cg.helmo.be/e180478/TutorRequest/validation/'+req.body.id, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'bearer '+req.body.token,
        },
    });
    if(rawResponse.status == 200){
        const response = await fetch('https://porthos-intra.cg.helmo.be/e180478/TutorRequest/active?id='+req.body.id, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+req.body.token,
            },

    });
        if(response.status==200){
            var value = new TextDecoder("utf-8").decode(await response.arrayBuffer());
            var mail = value.substring(1, value.length-1);
            console.log(mail);
            const nodemailer = require("nodemailer");
            const transporter = nodemailer.createTransport({
                service: 'hotmail',
                auth: {
                    user: 'studenthelphelmo@hotmail.com',
                    pass: "Lnctxszoyazbeztt"
                }
            })

            await transporter.sendMail({
                from: 'studenthelphelmo@hotmail.com',
                to: mail,
                subject: "Contact StudentHelp",
                text: "StudentHelp Platform: Un utilisateur vous a contacté ! Utilisateur: "+req.body.mail+" Message: "+req.body.text,
                html: `<a href="https://student-help.vercel.app/connection"><img src="https://www.zupimages.net/up/22/51/ow2l.png"></a><h1>StudentHelp platform</h1><b>Une demande de tutorat a été accepté !</b>`,
            })
        }
        res.status(200).json({});
    } else {
        res.status(400).json({});
    }
}