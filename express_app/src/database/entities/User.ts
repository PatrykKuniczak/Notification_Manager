import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {IsEmail, Length, MinLength} from "class-validator";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(2, 120, {
        message: "Login must have minimum length $constraint1 and maximal length is $constraint2."
    })
    login: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @MinLength(10, {
        message: "Password is too short. Minimal length is $constraint1."
    })
    password: string;
}