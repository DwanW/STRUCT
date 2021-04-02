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
