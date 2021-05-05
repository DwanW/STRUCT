import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Review } from "./Review";
import { User } from "./User";

@Entity()
export class ReviewVote extends BaseEntity {
  @Column({ type: "int" })
  value: number; // 1: helpful, 0: funny, -1: not helpful

  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  reviewId: number;

  //relationship
  @ManyToOne(() => User, (user) => user.review_votes)
  user: User;

  @ManyToOne(() => Review, (review) => review.review_votes)
  review: Review;
}