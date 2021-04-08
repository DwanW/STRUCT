import "reflect-metadata";
import "dotenv-safe/config";
import chalk from "chalk";
import { createConnection } from "typeorm";
import path from "path";
import { User } from "./entities/User";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";
import session from "express-session";
import { __prod__ } from "./constants";
import Redis from "ioredis";
import connectRedis from "connect-redis";

// session custom variable type merging
declare module "express-session" {
  export interface Session {
    userId?: number;
  }
}

const main = async () => {
  const connection = await createConnection({
    type: "postgres",
    entities: [User],
    url: process.env.DATABASE_URL,
    //   synchronize: true,
    logging: true,
    migrations: [path.join(__dirname, "./migrations/*")],
  });

  await connection.runMigrations();

  //express server
  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);
  // app.set("trust proxy", 1);
  // app.use(
  //   cors({
  //     origin: process.env.CORS_ORIGIN,
  //     credentials: true,
  //   })
  // );

  app.use(
    session({
      name: "struct-cookie",
      store: new RedisStore({
        client: redis,
        disableTouch: true,
        disableTTL: true,
      }),
      cookie: {
        maxAge: 1000 * 3600,
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });
  app.get("/", (_, res) => {
    res.send("hello world");
  });

  apolloServer.applyMiddleware({ app });

  app.listen(parseInt(process.env.PORT), () => {
    console.log(
      chalk.green.bold(
        `✔ express server started on port http://localhost:${process.env.PORT}`
      )
    );
    console.log(
      chalk.magenta.bold(
        `✔ apollo server started on port http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`
      )
    );
  });
};

main().catch((err) => {
  console.error(err);
});
