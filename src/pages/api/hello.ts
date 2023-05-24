// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { redisClient } from "@/utils/redis";
import type { NextApiRequest, NextApiResponse } from "next";

type GetResponse = {
  node: string;
  found: boolean;
  createdTime?: string;
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
  const node = req.query.node as string;
  const keyword = req.body.keyword as string;

  switch (req.method) {
    case "GET":
      const nodeBuiltStatus = await redisClient.get(node);
      if (!!nodeBuiltStatus) {
        return res
          .status(200)
          .json({ found: true, node, createdTime: nodeBuiltStatus });
      }
      return res.status(200).json({ found: false, node });
    case "POST":
      await redisClient.set(keyword, Date.now());
      return res.status(201).json({ message: "Added" });
  }
}
