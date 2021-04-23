import "dotenv-safe/config";
import { S3Client } from "@aws-sdk/client-s3";
import { S3REGION } from "./constants";

export const s3 = new S3Client({
  region: S3REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});