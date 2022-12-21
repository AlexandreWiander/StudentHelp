import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const rawResponse = await fetch('https://rest-jans-wian.azurewebsites.net/Meets', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'bearer '+req.body.token,
        },
        body: JSON.stringify({ name: req.body.name, place: req.body.place, from: req.body.from, to: req.body.to, userId:parseInt(req.body.id), invitedId:parseInt(req.body.invitedId) }),
    });
    if(rawResponse.status == 200){
        const response = await fetch('https://porthos-intra.cg.helmo.be/e180478/Auth/mail?id='+req.body.id, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+req.body.token,
            }});
        var mailUserString = new TextDecoder("utf-8").decode(await response.arrayBuffer());
        var mailUser = mailUserString.substring(1, mailUserString.length - 1);
        const responseInvited = await fetch('https://porthos-intra.cg.helmo.be/e180478/Auth/mail?id='+req.body.invitedId, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+req.body.token,
            }});
        var mailInvitedString = new TextDecoder("utf-8").decode(await responseInvited.arrayBuffer());
        var mailInvited = mailInvitedString.substring(1, mailInvitedString.length - 1);
        const nodemailer = require("nodemailer");
        const transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: 'studenthelphelmo@hotmail.com',
                pass: "Lnctxszoyazbeztt"
            }
        })

        const date = req.body.from.substring(0,10);
        const hourFrom = req.body.from.substring(11);
        const hourTo = req.body.to.substring(11);
        await transporter.sendMail({
            from: 'studenthelphelmo@hotmail.com',
            to: mailUser+", "+mailInvited,
            subject: "Contact StudentHelp",
            text: "StudentHelp Platform: Un rendez-vous a été créé ! ",
            html: `<a href="https://student-help.vercel.app/connection"><img src="https://www.zupimages.net/up/22/51/ow2l.png"></a><h1>StudentHelp platform</h1><b>Un nouveau rendez-vous a été créé !</b><p>Nom: ${req.body.name}
</p><p>Lieu: ${req.body.place}</p><p>Le: ${date} à ${hourFrom} jusque ${hourTo}</p>`,
        })
        res.status(200).json({});
    } else {
        res.status(400).json({});
    }

}