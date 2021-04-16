import { User } from "../entities/User";
import {
  Resolver,
  Query,
  Mutation,
  ObjectType,
  Field,
  Arg,
  Int,
  Ctx,
} from "type-graphql";
// import { MyContext } from "../types";
import { RegisterInput } from "../utils/RegisterInput";
import { validate } from "class-validator";
import argon from "argon2";
import { MyContext } from "../types";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { sendEmail } from "../utils/sendEmail";
import { v4 } from "uuid";

@ObjectType()
class AuthResponse {
  @Field(() => String, { nullable: true })
  error?: string;

  @Field(() => User, { nullable: true })
  user?: User;
}

// resolvers for apollo graphql server
@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }

    return User.findOne(req.session.userId);
  }

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
    @Arg("options", () => RegisterInput) options: RegisterInput,
    @Ctx() { req }: MyContext
  ): Promise<AuthResponse> {
    //create user
    const errorMessage = await validate(options);
    // console.log("errorMessage", errorMessage);
    if (errorMessage.length > 0) {
      return {
        error: errorMessage.toString(),
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

    req.session.userId = user?.id;

    return {
      user,
    };
  }

  @Mutation(() => AuthResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<AuthResponse> {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return {
        error: "User does not exist",
      };
    }
    const valid = await argon.verify(user.password, password);
    if (!valid) {
      return {
        error: "username or password is incorrect",
      };
    }

    req.session.userId = user.id;
    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // the email is not in the db
      return true;
    }

    const token = v4();
    console.log({ token });

    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      1000 * 3600
    );

    await sendEmail(
      email,
      `<a href="${process.env.CORS_ORIGIN}/change-password/${token}">reset password</a>`
    );
    return true;
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
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
        }
        resolve(true);
      })
    );
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
