import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  user: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await fetch(
    "https://rest-jans-wian.azurewebsites.net/Auth/userInfoUser?id=" +
      req.body.idUser,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "bearer " + req.body.token,
      },
    }
  )
    .then((res) => res.json())
    .then((result) => {
      let user = result;

      console.log(result);

      res.status(200).json({ user: user });
    });
}
