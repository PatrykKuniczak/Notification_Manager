import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Max, MaxLength, Min} from "class-validator";
import {createTimeStamp} from "../../controllers/helpers/helpers";


@Entity()
export class Profile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    @MaxLength(500, {message: "Description is too long. Maximal length is $constraint1."})
    description: string;

    @Column("bigint")
    @Min(createTimeStamp("1920-01-01 00:00"), {message: "Date must be after 1920-01-01 00:00."})
    @Max(Date.parse(new Date().toUTCString()) / 1000, {message: "Date must be before actual date."})
    birthDate: number;
}