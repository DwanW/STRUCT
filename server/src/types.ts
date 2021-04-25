import { Request, Response } from "express";
import { Redis } from "ioredis";
import { createCreatorLoader } from "./utils/Loaders";

export type MyContext = {
  req: Request;
  res: Response;
  redis: Redis;
  creatorLoader: ReturnType<typeof createCreatorLoader>
};
