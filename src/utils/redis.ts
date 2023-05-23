import { createClient } from "redis";

export const redisClient = createClient({
  password: "guhEgEdlG2guLFhkMbW7KP7h1VZ3HKmg",
  socket: {
    host: "redis-18168.c1.ap-southeast-1-1.ec2.cloud.redislabs.com",
    port: 18168,
  },
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));
