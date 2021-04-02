import { User } from "../entities/User";
import {
  Resolver,
  Query,
  Mutation,
  ObjectType,
  Field,
  Arg,
  Int,
} from "type-graphql";
// import { MyContext } from "../types";
import { RegisterInput } from "../utils/RegisterInput";
import { validate, ValidationError } from "class-validator";
import argon from "argon2";

@ObjectType()
class AuthResponse {
  @Field(() => String, { nullable: true })
  error?: ValidationError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

// resolvers for apollo graphql server
@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(@Arg("id", () => Int) id: number): Promise<User | null> {
    //find user by id
    const user = await User.findOne(id);
    if (!user) {
      return null;
    }

    return user;
  }

  @Mutation(() => AuthResponse)
  async register(
    @Arg("options", () => RegisterInput) options: RegisterInput
  ): Promise<AuthResponse> {
    //create user
    const errorMessage = await validate(options);
    // console.log("errorMessage", errorMessage);
    if (errorMessage.length > 0) {
      return {
        error: errorMessage,
      };
    }

    const hashedPassword = await argon.hash(options.password);
    let user;

    try {
      const newUser = User.create({
        username: options.username,
        email: options.email,
        password: hashedPassword,
      });

      const result = await User.save(newUser);
      user = result;
    } catch (err) {
      console.log("createUser error: ", err);
    }

    return {
      user,
    };
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg("about", () => String) about: string,
    @Arg("id", () => Int) id: number
  ): Promise<User | null> {
    const user = await User.findOne(id);
    if (!user) {
      return null;
    }
    user.about = about;
    const result = await user.save();
    return result;
  }

  @Mutation(() => Boolean)
  async deleteUserById(@Arg("id", () => Int) id: number): Promise<boolean> {
    const userToDelete = await User.findOne(id);
    if (!userToDelete) {
      return false;
    }

    await User.delete(id);
    return true;
  }
}
