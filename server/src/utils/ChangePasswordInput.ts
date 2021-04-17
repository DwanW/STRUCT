import { Length } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class ChangePasswordInput {
  @Field()
  @Length(6, 100, {
    message: "password length must be between 6 to 100 characters",
  })
  password: string;
}
