import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export class Story extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title!: string;

    @Column()
    introText!: string;
}