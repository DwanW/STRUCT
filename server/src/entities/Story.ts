import {
  BaseEntity,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Vote } from "./Vote";

export class Story extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  overview!: string;

  @Column()
  cover_url: string;

  @Column("int", { default: 0 })
  up_vote: number;

  @Column("int", { default: 0 })
  down_vote: number;

  @Column({ default: "draft" })
  status: string;

  @Column()
  creatorId: number;

  @CreateDateColumn({ type: "date" })
  createdAt: Date = new Date();

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date = new Date();

  //relationship
  @ManyToOne(() => User, (user) => user.story)
  creator: User;

  @OneToMany(() => Vote, (vote) => vote.story)
  votes: Vote[];
}
