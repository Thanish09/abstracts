// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { redisClient } from "@/utils/redis";
import type { NextApiRequest, NextApiResponse } from "next";
import { RedisClientOptions, RedisClientType } from "redis";

type Data = {
  name: string;
};

(async () => {
  await redisClient.connect();
})();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { suggest } = req.query;
  res.status(200).json({ name: "John Doe" });
}
