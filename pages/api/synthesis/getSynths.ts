import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    listSynth: string;//list
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const rawResponse = await fetch('lien', {
        method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
    });
    const content = await rawResponse.json();

    if(rawResponse.status == 200){
        //Tu revoie la liste des synthèse
    } else {
        //tu renvoie une erreur
    }
  }