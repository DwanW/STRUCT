import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { IsEmail, IsUrl, Length } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import { Story } from "./Story";
import { Vote } from "./Vote";

@ObjectType({ description: "The user model" })
@Entity()
export class User extends BaseEntity {
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

  @Field({ nullable: true })
  @Column()
  @IsUrl()
  avatar_url: string;

  @Field(() => String)
  @CreateDateColumn({ type: "date" })
  createdAt: Date = new Date();

  @Field(() => String)
  @UpdateDateColumn({ type: "date" })
  updatedAt: Date = new Date();

  //relationship
  @OneToMany(() => Story, (story) => story.creator)
  story: Story[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];
}
