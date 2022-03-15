import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {IsBoolean, IsDate, Length, MinDate, MinLength} from "class-validator";


@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(5, 255, {
        message: "Title must have minimum length $constraint1 and maximal length is $constraint2."
    })
    title: string;

    @Column("text")
    @MinLength(10, {
        message: "Description is too short. Minimal length is $constraint1."
    })
    description: string;

    @IsBoolean({message: "Important must be a boolean value."})
    @Column()
    important: boolean;

    @MinLength(2, {message: "Type is too short. Minimal length is $constraint1"})
    @Column()
    taskType: string

    // TODO: NAPRAW MINDATE
    @Column("datetime")
    // @MinDate(new Date(), {message: "Date must be after: $constraint1."})
    notificationDate: Date
}