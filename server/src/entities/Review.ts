import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ReviewVote } from "./ReviewVote";
import { Story } from "./Story";
import { User } from "./User";

@ObjectType({ description: "review model" })
@Entity()
export class Review extends BaseEntity {
  @Field(() => ID!)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  text!: string;

  // positive, negative, neutral
  @Field()
  @Column()
  type!: string;

  @Field()
  @Column("int", { default: 0 })
  helpful_score: number;

  @Field()
  @Column("int", { default: 0 })
  funny_score: number;

  @Field()
  @Column("int", { default: 0 })
  unhelpful_score: number;

  @Field()
  @Column()
  userId: number;

  @Field()
  @Column()
  storyId: number;

  //relationship
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @Field(() => Story)
  @ManyToOne(() => Story, (story) => story.reviews, { onDelete: "CASCADE" })
  story: Story;

  @OneToMany(() => ReviewVote, (review_vote) => review_vote.review)
  review_votes: ReviewVote[];
}
