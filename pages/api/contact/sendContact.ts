import type { NextApiRequest, NextApiResponse } from "next";


type Data = {
    message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const rawResponse = await fetch('https://porthos-intra.cg.helmo.be/e180478/AdminContact/request', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({mail: req.body.mail, message: req.body.text})
    });

    if (rawResponse.status == 200) {
        const response = await fetch('https://porthos-intra.cg.helmo.be/e180478/AdminContact/Admins', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        if (response.status == 200) {
            var link = new TextDecoder("utf-8").decode(await response.arrayBuffer());
            var mailsWithStrokes = link.substring(1, link.length - 1);
            var mails = mailsWithStrokes.replaceAll("\"", "");
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
                to: mails,
                subject: "Contact StudentHelp",
                text: "StudentHelp Platform: Un utilisateur vous a contacté ! Utilisateur: "+req.body.mail+" Message: "+req.body.text,
                html: `<a href="https://student-help.vercel.app/connection"><img src="https://www.zupimages.net/up/22/51/ow2l.png"></a><h1>StudentHelp platform</h1><b>Un utilisateur vous a contacté !</b><p>Utilisateur: ${req.body.mail}
</p><p>Message: ${req.body.text}</p>`,
            })
        }

        res.status(200).json({message: "Success"});
    } else {
        res.status(400).json({message: rawResponse.statusText});
    }
}