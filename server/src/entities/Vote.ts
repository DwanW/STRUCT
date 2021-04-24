import { BaseEntity, Column, ManyToOne, PrimaryColumn } from "typeorm";
import { Story } from "./Story";
import { User } from "./User";

export class Vote extends BaseEntity {
  @Column({ type: "int" })
  value: number;

  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  storyId: number;

  //relationship
  @ManyToOne(() => User, (user) => user.votes)
  user: User;

  @ManyToOne(() => Story, (story) => story.votes)
  story: Story;
}
