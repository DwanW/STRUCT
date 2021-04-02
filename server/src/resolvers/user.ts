import { User } from "../entities/User";
import { Resolver, Query } from "type-graphql";
// import { MyContext } from "../types";
import { getManager } from "typeorm";

// resolvers for apollo graphql server
@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    const users = await getManager().find(User)
    return {
      users: users,
    };
  }
}
