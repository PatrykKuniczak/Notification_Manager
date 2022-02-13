import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {Length, MinLength} from "class-validator";

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(10, 255, {
        message: "Title must have minimum length $constraint1 and maximal length is $constraint2."
    })
    title: string;

    @Column("text")
    @MinLength(50, {
        message: "Description is too short. Minimal length is $constraint1."
    })
    description: string;

}