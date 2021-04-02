import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import { IsEmail, Length } from "class-validator";
import { Field, ObjectType } from "type-graphql";

@ObjectType({ description: "The user model" })
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  @Length(4, 100)
  username!: string;

  @Field()
  @Column({ unique: true })
  @IsEmail()
  email!: string;

  @Column()
  @Length(6, 100)
  password!: string;

  @Field()
  @Column({ default: "" })
  about: string;

  @Field()
  @Column("int", { default: 0 })
  endorsed: number;

  @Field()
  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: "date" })
  updatedAt: Date;
}
