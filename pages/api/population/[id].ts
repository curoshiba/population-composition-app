import type { NextApiRequest, NextApiResponse } from "next";

const Header = new Headers();
Header.append("X-API-KEY", process.env.API_KEY as string);

export default async function getPrefectures(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${req.query.id}`;
  const response = await fetch(url, {
    method: "GET",
    headers: Header,
  });
  const data = await response.json();
  res.status(200).json({ data });
}
