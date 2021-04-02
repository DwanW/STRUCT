import { Resolver, Query } from "type-graphql";

// resolvers for apollo graphql server
@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello() {
    return "hello world from apollo server";
  }
}
