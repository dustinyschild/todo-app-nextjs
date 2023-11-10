import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiResponse = await fetch(
    `${process.env.API_BASE_URL}/todo/all?userId=${req.query.userId}`
  );

  const todos = await apiResponse.json();

  return res.status(200).json(todos);
}
