
import { PrimaryGeneratedColumn, Column, CreateDateColumn, Entity, ManyToOne } from "typeorm"
import { Properties } from "./properties.entity"
import { Users } from "./users.entity"

@Entity()
export class Schedules {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column()
    date: string

    @Column()
    hour: string

    @ManyToOne((type) => Users, (users) => users.schedules, { onDelete: "CASCADE", nullable: false, eager: true })
    user: Users

    @ManyToOne((type) => Properties, (properties) => properties.schedules, { onDelete: "CASCADE", nullable: false })
    property: Properties
}