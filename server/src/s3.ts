import "dotenv-safe/config";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const REGION = "ca-central-1";
const bucketName = "struct-bucket";

const keyName = "test.txt";
const objectParams = { Bucket: bucketName, Key: keyName, Body: "testtest2" };

const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const run = async () => {
  try {
    const results = await s3.send(new PutObjectCommand(objectParams));
    console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
    console.log({ results });
  } catch (err) {
    console.log("Error", err);
  }
};

run();
