import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export class Story extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  overview!: string;

  @Column()
  cover_url: string;

  @Column()
  up_vote: number;

  @Column()
  down_vote: number;

  @CreateDateColumn({ type: "date" })
  createdAt: Date = new Date();

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date = new Date();
}
