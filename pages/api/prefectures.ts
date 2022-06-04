import type { NextApiRequest, NextApiResponse } from "next";

const myHeaders = new Headers();
myHeaders.append("X-API-KEY", process.env.API_KEY as string);

const url = "https://opendata.resas-portal.go.jp/api/v1/prefectures";
console.log(process.env.API_KEY);
export default async function getPrefectures(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(url, {
    method: "GET",
    headers: myHeaders,
  });
  const data = await response.json();
  console.log(data);
  res.status(200).json({ data });
}
