// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { redisClient } from "@/utils/redis";
import type { NextApiRequest, NextApiResponse } from "next";

type GetResponse = {
  keyword: string;
  found: boolean;
  dateAdded?: string;
};

type PostResponse = {
  message: string;
};

(async () => {
  await redisClient.connect();
})();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetResponse | PostResponse>
) {
  const suggest = req.query.suggest as string;
  const keyword = req.body.keyword as string;

  switch (req.method) {
    case "GET":
      const suggestVal = await redisClient.get(suggest);
      if (!!suggestVal) {
        return res
          .status(200)
          .json({ found: true, keyword: suggest, dateAdded: suggestVal });
      }
      return res.status(200).json({ found: false, keyword: suggest });
    case "POST":
      await redisClient.set(keyword, Date.now());
      return res.status(201).json({ message: "Added" });
  }
}
