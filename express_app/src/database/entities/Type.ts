import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {Length, Matches} from "class-validator";

@Entity()
export class Type {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Matches(/^[a-żA-Ż\s]+$/, {message: "Type must have only letters."})
    @Length(3, 255, {
        message: "Name must have minimum length $constraint1 and maximal length is $constraint2."
    })
    name: string;
}