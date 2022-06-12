import type { NextApiRequest, NextApiResponse } from "next";

const myHeaders = new Headers();
myHeaders.append("X-API-KEY", process.env.API_KEY as string);

const url = "https://opendata.resas-portal.go.jp/api/v1/prefectures";
export default async function getPrefectures(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: myHeaders,
    });
    const data = await response.json();
    res.status(200).json({ data });
  } catch (error) {
    res.status(403).json({ error });
  }
}
